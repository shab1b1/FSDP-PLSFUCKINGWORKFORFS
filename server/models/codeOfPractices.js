module.exports = (sequelize, DataTypes) => {
    const CodeOfPractice = sequelize.define("CodeOfPractice", {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        authority: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'cop'
    });

    return CodeOfPractice;
};
