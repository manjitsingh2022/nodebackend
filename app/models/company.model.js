const CompanySchema=new monggoose.Schema({

    
    company: {
        type: String,
        enum: ["apple", "dell", "mi"],
        message: `{VALUE} is not supported.`,
      },
})
module.exports=monggoose.model("Company",CompanySchema)