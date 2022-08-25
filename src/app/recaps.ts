const username:string|number = 'Alexis'

const sum = (a:number, b:number)=>{
  return a+b
}

sum(1,2)


class Person{

  constructor(public age:number, public lastname:string){

  }
}

const Alexis = new Person(31, 'Ávila')
Alexis.age
