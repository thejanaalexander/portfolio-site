const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { initDB, Project } = require('./database');

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Config from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'my_super_secret_key_123';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.CORS_ORIGIN || '*';
app.use(cors({
    origin: allowedOrigins === '*' ? '*' : allowedOrigins.split(','),
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Ensure CV uploads directory exists
const cvDir = path.join(__dirname, 'uploads', 'cv');
if (!fs.existsSync(cvDir)) {
    fs.mkdirSync(cvDir);
}

// CV-specific multer config
const cvStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads', 'cv'));
    },
    filename: (req, file, cb) => {
        cb(null, 'cv' + path.extname(file.originalname));
    }
});
const cvUpload = multer({
    storage: cvStorage
});

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Initialize Database
initDB();

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ error: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
    });
};

// Login Route
app.post('/api/login', (req, res) => {
    console.log('Login Body:', req.body);
    const { password } = req.body;

    // Trim whitespace to avoid copy-paste errors
    const cleanPassword = password ? password.trim() : '';

    if (cleanPassword === ADMIN_PASSWORD) {
        console.log('Login Success!');
        const token = jwt.sign({ id: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ auth: true, token });
    } else {
        console.log(`Login Failed. Expected: '${ADMIN_PASSWORD}', Received: '${cleanPassword}'`);
        res.status(401).json({ auth: false, message: 'Invalid password' });
    }
});

// GET All Projects (Public)
app.get('/api/projects', async (req, res) => {
    // ...
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET Favourite Projects (Public - for homepage carousel)
app.get('/api/projects/favourites', async (req, res) => {
    try {
        const favourites = await Project.findAll({ where: { isFavourite: true } });
        res.json(favourites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET Single Project
app.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (project) res.json(project);
        else res.status(404).json({ error: 'Project not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH Toggle Favourite (Protected)
app.patch('/api/projects/:id/favourite', verifyToken, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        project.isFavourite = !project.isFavourite;
        await project.save();
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST New Project (Protected)
app.post('/api/projects', verifyToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), async (req, res) => {
    try {
        const { title, category, description, technologies, liveLink, githubLink } = req.body;

        let imagePath = null;
        if (req.files['image']) {
            imagePath = `http://localhost:${PORT}/uploads/${req.files['image'][0].filename}`;
        }

        let galleryPaths = [];
        if (req.files['gallery']) {
            galleryPaths = req.files['gallery'].map(file => `http://localhost:${PORT}/uploads/${file.filename}`);
        }

        const newProject = await Project.create({
            title,
            category,
            description,
            technologies: JSON.parse(technologies || '[]'),
            image: imagePath,
            gallery: galleryPaths,
            liveLink,
            githubLink
        });

        res.status(201).json(newProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// PUT Update Project (Protected)
app.put('/api/projects/:id', verifyToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), async (req, res) => {
    try {
        const { title, category, description, technologies, liveLink, githubLink } = req.body;
        const project = await Project.findByPk(req.params.id);

        if (!project) return res.status(404).json({ error: 'Project not found' });

        let imagePath = project.image;
        if (req.files['image']) {
            // TODO: Delete old image
            imagePath = `http://localhost:${PORT}/uploads/${req.files['image'][0].filename}`;
        }

        let galleryPaths = project.gallery;
        if (req.files['gallery']) {
            const newPaths = req.files['gallery'].map(file => `http://localhost:${PORT}/uploads/${file.filename}`);
            galleryPaths = [...galleryPaths, ...newPaths];
        }

        await project.update({
            title,
            category,
            description,
            technologies: technologies ? JSON.parse(technologies) : project.technologies,
            image: imagePath,
            gallery: galleryPaths,
            liveLink,
            githubLink
        });

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE Project (Protected)
app.delete('/api/projects/:id', verifyToken, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });

        // TODO: Delete usage files from filesystem
        await project.destroy();
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- TESTIMONIALS API ---

// GET All Testimonials
app.get('/api/testimonials', async (req, res) => {
    try {
        const { Testimonial } = require('./database');
        const testimonials = await Testimonial.findAll();
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST New Testimonial (Protected)
app.post('/api/testimonials', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { Testimonial } = require('./database');
        const { name, role, text, rating } = req.body;

        let imagePath = null;
        if (req.file) {
            imagePath = `http://localhost:${PORT}/uploads/${req.file.filename}`;
        }

        const newTestimonial = await Testimonial.create({
            name,
            role,
            text,
            rating: rating || 5,
            image: imagePath
        });

        res.status(201).json(newTestimonial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT Update Testimonial (Protected)
app.put('/api/testimonials/:id', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { Testimonial } = require('./database');
        const testimonial = await Testimonial.findByPk(req.params.id);

        if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });

        const { name, role, text, rating } = req.body;

        let imagePath = testimonial.image;
        if (req.file) {
            imagePath = `http://localhost:${PORT}/uploads/${req.file.filename}`;
        }

        await testimonial.update({
            name,
            role,
            text,
            rating: rating || testimonial.rating,
            image: imagePath
        });

        res.json(testimonial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE Testimonial (Protected)
app.delete('/api/testimonials/:id', verifyToken, async (req, res) => {
    try {
        const { Testimonial } = require('./database');
        const testimonial = await Testimonial.findByPk(req.params.id);

        if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });

        await testimonial.destroy();
        res.json({ message: 'Testimonial deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// --- CLIENT MESSAGES API ---

// POST New Message (Public)
app.post('/api/contact', async (req, res) => {
    try {
        const { Message } = require('./database');
        const { name, email, mobile, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newMessage = await Message.create({ name, email, mobile, message });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET All Messages (Protected)
app.get('/api/messages', verifyToken, async (req, res) => {
    try {
        const { Message } = require('./database');
        const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE Message (Protected)
app.delete('/api/messages/:id', verifyToken, async (req, res) => {
    try {
        const { Message } = require('./database');
        const msg = await Message.findByPk(req.params.id);

        if (!msg) return res.status(404).json({ error: 'Message not found' });

        await msg.destroy();
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// --- CV MANAGEMENT API ---

// GET CV info (Public)
app.get('/api/cv', (req, res) => {
    try {
        const cvPath = path.join(__dirname, 'uploads', 'cv');
        if (!fs.existsSync(cvPath)) {
            return res.json({ exists: false });
        }

        const files = fs.readdirSync(cvPath).filter(f => f.startsWith('cv'));
        if (files.length === 0) {
            return res.json({ exists: false });
        }

        const filePath = path.join(cvPath, files[0]);
        const stats = fs.statSync(filePath);

        res.json({
            exists: true,
            filename: files[0],
            url: `/uploads/cv/${files[0]}`,
            uploadedAt: stats.mtime,
            size: stats.size
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST Upload CV (Protected)
app.post('/api/cv', verifyToken, upload.single('cv'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file uploaded' });
        }

        // Move file from uploads/ to uploads/cv/
        const cvDir = path.join(__dirname, 'uploads', 'cv');
        if (!fs.existsSync(cvDir)) {
            fs.mkdirSync(cvDir, { recursive: true });
        }

        // Delete any old CV files first
        const oldFiles = fs.readdirSync(cvDir).filter(f => f.startsWith('cv'));
        oldFiles.forEach(f => {
            fs.unlinkSync(path.join(cvDir, f));
        });

        // Move uploaded file to cv directory with a clean name
        const ext = path.extname(req.file.originalname);
        const newFilename = 'cv' + ext;
        const newPath = path.join(cvDir, newFilename);
        fs.renameSync(req.file.path, newPath);

        res.json({
            message: 'CV uploaded successfully',
            filename: newFilename,
            url: `/uploads/cv/${newFilename}`
        });
    } catch (error) {
        console.error('CV Upload Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE CV (Protected)
app.delete('/api/cv', verifyToken, (req, res) => {
    try {
        const cvPath = path.join(__dirname, 'uploads', 'cv');
        if (!fs.existsSync(cvPath)) {
            return res.status(404).json({ error: 'No CV found' });
        }

        const files = fs.readdirSync(cvPath).filter(f => f.startsWith('cv'));
        if (files.length === 0) {
            return res.status(404).json({ error: 'No CV found' });
        }

        files.forEach(f => {
            fs.unlinkSync(path.join(cvPath, f));
        });

        res.json({ message: 'CV deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- ANALYTICS API ---

// GET Analytics Data (Protected)
app.get('/api/analytics', verifyToken, async (req, res) => {
    try {
        const { Project, Testimonial, Message } = require('./database');
        const { Op, fn, col } = require('sequelize');

        // Total counts
        const totalProjects = await Project.count();
        const totalTestimonials = await Testimonial.count();
        const totalMessages = await Message.count();

        // Projects by category
        const projectsByCategory = await Project.findAll({
            attributes: ['category', [fn('COUNT', col('category')), 'count']],
            group: ['category'],
            raw: true
        });

        // Average testimonial rating
        const avgRatingResult = await Testimonial.findOne({
            attributes: [[fn('AVG', col('rating')), 'avgRating']],
            raw: true
        });
        const avgRating = avgRatingResult?.avgRating ? parseFloat(avgRatingResult.avgRating).toFixed(1) : '0.0';

        // Messages over last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentMessages = await Message.findAll({
            where: { createdAt: { [Op.gte]: sevenDaysAgo } },
            attributes: ['createdAt'],
            raw: true
        });

        // Group messages by day
        const messageTrend = {};
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toISOString().split('T')[0];
            messageTrend[key] = 0;
        }
        recentMessages.forEach(m => {
            const key = new Date(m.createdAt).toISOString().split('T')[0];
            if (messageTrend[key] !== undefined) messageTrend[key]++;
        });

        // Technologies usage across projects
        const allProjects = await Project.findAll({ attributes: ['technologies'], raw: true });
        const techCounts = {};
        allProjects.forEach(p => {
            if (p.technologies) {
                let techs = p.technologies;
                if (typeof techs === 'string') {
                    try { techs = JSON.parse(techs); } catch { techs = []; }
                }
                if (Array.isArray(techs)) {
                    techs.forEach(t => {
                        const name = t.trim();
                        if (name) techCounts[name] = (techCounts[name] || 0) + 1;
                    });
                }
            }
        });
        const topTechnologies = Object.entries(techCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([name, count]) => ({ name, count }));

        // Rating distribution
        const ratingDist = await Testimonial.findAll({
            attributes: ['rating', [fn('COUNT', col('rating')), 'count']],
            group: ['rating'],
            raw: true
        });

        res.json({
            totals: { projects: totalProjects, testimonials: totalTestimonials, messages: totalMessages },
            projectsByCategory,
            avgRating,
            messageTrend: Object.entries(messageTrend).map(([date, count]) => ({ date, count })),
            topTechnologies,
            ratingDistribution: ratingDist
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- PRODUCTION: Serve React Frontend ---
if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.join(__dirname, 'client');
    app.use(express.static(clientBuildPath));

    // All non-API routes → React app (client-side routing)
    app.get('{*path}', (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
