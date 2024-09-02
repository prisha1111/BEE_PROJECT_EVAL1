const IncomeSchema = require("../models/incomeModel")


exports.addIncome = async(req, res) =>{
    const {title, amount, category, description, date} = req.body

    const income= IncomeSchema({
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
        res.status(200).json({msg: 'Income Added!'})
    } catch (error) {
        res.status(500).json({msg: 'Server Error!'})
    }

    console.log(income)
}

exports.getIncomes = async(req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({msg: 'Server Error'})
    }
}

exports.deleteIncome = async(req, res) =>{
    const  {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({msg: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({msg: 'Server Error'})
        })
    
}
exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        // Find and update the income record
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
            id,
            { title, amount, category, description, date },
            { new: true, runValidators: true } // Options: return the updated document and run schema validation
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json(updatedIncome);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};