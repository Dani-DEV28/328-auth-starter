import {schema, createUser, hashPass, validatePass} from "../model/user.js";

const user = await createUser("bob", "Super-Password-123?!");
console.log(user);

const valid = await validatePass("Super-Password-abc?!", user.password);
if(valid){
    console.log("Valid Match");
}else{
    console.log("Rejected valid password");
}