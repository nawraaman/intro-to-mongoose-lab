const prompt = require('prompt-sync')()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const Customer = require('./models/customer.js')

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  await runQueries()

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
  process.exit()
}

const runQueries = async () => {
  console.log('Welcome to the CRM')

  console.log('\n1. Create a customer')
  console.log('2. View all customers')
  console.log('3. Update a customer')
  console.log('4. Delete a customer')
  console.log('5. Quit')

  const choice = prompt('Enter your choice: ')

  if (choice === '1') await createCustomer()
  else if (choice === '2') await viewCustomers()
  else if (choice === '3') await updateCustomer()
  else if (choice === '4') await deleteCustomer()
  else if (choice === '5') return

  await runQueries()
}

const createCustomer = async () => {
  const name = prompt('Enter customer name: ')
  const age = prompt('Enter customer age: ')
  const customer = await Customer.create({ name, age })
  console.log('Customer created:', customer)
}

const viewCustomers = async () => {
  const customers = await Customer.find({})
  console.log('All customers:', customers)
}

const updateCustomer = async () => {
  const id = prompt('Enter customer ID to update: ')
  const name = prompt('Enter new name: ')
  const age = prompt('Enter new age: ')
  const updatedCustomer = await Customer.findByIdAndUpdate(
    id,
    { name, age },
    { new: true }
  )
  console.log('Customer updated:', updatedCustomer)
}

const deleteCustomer = async () => {
  const id = prompt('Enter customer ID to delete: ')
  await Customer.findByIdAndDelete(id)
  console.log('Customer deleted')
}

connect()
