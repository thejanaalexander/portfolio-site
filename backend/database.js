const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Initialize Sequelize — use PostgreSQL in production, SQLite locally
let sequelize;

if (process.env.DATABASE_URL) {
    // Production: PostgreSQL on Render
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    });
} else {
    // Local development: SQLite (no setup needed)
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, 'database.sqlite'),
        logging: false
    });
}

// Define Project Model
const Project = sequelize.define('Project', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    technologies: {
        type: DataTypes.JSON, // Store as JSON array string
        allowNull: true
    },
    image: {
        type: DataTypes.STRING, // Main image path
        allowNull: true
    },
    gallery: {
        type: DataTypes.JSON, // Store array of paths
        allowNull: true
    },
    liveLink: {
        type: DataTypes.STRING,
        allowNull: true
    },
    githubLink: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isFavourite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

const Testimonial = sequelize.define('Testimonial', {
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 },
    image: { type: DataTypes.STRING, allowNull: true }
});

const Message = sequelize.define('Message', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    mobile: { type: DataTypes.STRING, allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: false }
});

// Sync Database
const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ alter: true }); // Creates tables if they don't exist, alters if they do
        console.log('Database synced.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, Project, Testimonial, Message, initDB };
