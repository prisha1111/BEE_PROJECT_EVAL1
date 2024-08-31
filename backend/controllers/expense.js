const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async(req, res) =>{
    const {title, amount, category, description, date} = req.body

    const income= ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.Status(400).json({message: 'All fields are required!'})
        }
        if(amount <=0 || !amount=== 'number'){
            return res.Status(400).json({message: 'Amounts should be positive!'})
        }
        await income.save()
        res.status(200).json({msg: 'Expense Added!'})
    } catch (error) {
        res.status(500).json({msg: 'Server Error!'})
    }

    console.log(income)
}

exports.getExpense = async(req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({msg: 'Server Error'})
    }
}

exports.deleteExpense = async(req, res) =>{
    const  {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({msg: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({msg: 'Server Error'})
        })
    
}