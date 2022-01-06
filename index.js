const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
          const contList = await listContacts();
          console.table(contList);
      break;

    case 'get':
          const getById = await getContactById(id);
          console.table(getById);
      break;

    case 'add':
          const newContact = await addContact(name, email, phone);
          console.table(newContact);
      break;

    case 'remove':
          const removeById = await removeContact(id)
          console.table(removeById)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);