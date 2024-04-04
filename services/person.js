class PersonService {
  constructor(personModel) {
    this.personModel = personModel;
  }

  async getAll() {
    return this.personModel.find({});
  }

  async getByName(name) {
    return this.personModel.find({ name });
  }

  async getById(id) {
    return this.personModel.findById(id);
  }

  async create(person) {
    return this.personModel.create(person);
  }

  async update(id, person) {
    return this.personModel.findByIdAndUpdate(id, person, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return this.personModel.findByIdAndDelete(id);
  }
}

module.exports = new PersonService(require("../models/index"));
