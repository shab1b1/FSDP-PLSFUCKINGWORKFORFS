module.exports = (sequelize, DataTypes) => {
    const codeOfPractice = sequelize.define("codeOfPractice", {
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

    return codeOfPractice;
};
