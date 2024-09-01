// Model p/cada aluno
import { Model, Sequelize } from "sequelize";

export default class Foto extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ser vazio.'
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ser vazio.'
            },
      },
    },
  },
      {
        sequelize,
        tableName: 'fotos',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'id' });
  }
}