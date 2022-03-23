use std::fmt;

enum PersonId {
    Passport(String),
    Phone(u64),
}

impl fmt::Display for PersonId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            PersonId::Passport(id) => write!(f, "Passport: {}", id),
            PersonId::Phone(id) => write!(f, "Phone: {}", id),
        }
    }
}

trait Log {
    fn log(&self);
    // associated function
    // fn yo() {
    //     println!("I am amazing associated function");
    // }
    // // method
    // fn yoo(&self) {
    //     println!("I am amazing method");
    // }
}

struct Animal(String, u32);

impl Log for Animal {
    fn log(&self) {
        println!("Animal: {}", self.0);
    }
}


// NOTE: References on static values sitting on stack
fn main() {
    let mut name = String::from("Hello"); 
    let mut name_2 = "Hellow"; // read-only; immutable

    let animal = Animal("dog".to_string(), 1);
    // let Animal(animal_name, animal_age) = animal;
    // println!("{} is {} years old", animal_name, animal_age);
    // animal.log();
    // animal.yoo();
    // Animal::yo();

    // log_2(&animal);
    // log_1(animal);

    let person_id = PersonId::Passport("12345".to_string());
    let person_id2 = PersonId::Phone(12345234234);

    println!("{}", person_id);
    println!("{}", person_id2);
    //
    // check_id(person_id);
    // check_id(person_id2);

}

fn check_id(id: PersonId) {
    match id {
        PersonId::Passport(passport_number) => println!("Passport number: {}", passport_number),
        PersonId::Phone(phone_number) => println!("Phone number: {}", phone_number),
    }
}

fn log_1(val: impl Log) {
    val.log();
}

fn log_2(val: &dyn Log) {
    val.log();
}
