const { green, red } = require("chalk");
const { db, Student, Campus } = require("./server/db/index");

const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    const campuses = [
      {
        name: "Google",
        imageUrl: "https://media2.govtech.com/images/940*630/shutterstock_630500720.jpg",
        address: "111 8th Ave, New York, NY 10011",
        description: "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Microsoft."
      }, {
        name: "Facebook",
        imageUrl: "https://media.bizj.us/view/img/11214525/illustrative-campus-district*1200xx7680-4320-0-0.jpg",
        address: "1601 Willow Rd., Menlo Park, CA, 94025",
        description: "Facebook is an American online social media and social networking service based in Menlo Park, California and a flagship service of the namesake company Facebook, Inc. It was founded by Mark Zuckerberg, along with fellow Harvard College students and roommates Eduardo Saverin, Andrew McCollum, Dustin Moskovitz and Chris Hughes. The founders initially limited Facebook membership to Harvard students. Membership was expanded to Ivy League universities, MIT, and higher education institutions in the Boston area, then various other universities, and lastly high school students. Since 2006, anyone who claims to be at least 13 years old has been allowed to become a registered user of Facebook, though this may vary depending on local laws. The name comes from the face book directories often given to American university students."
      }, {
        name: "Microsoft",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Building92microsoft.jpg/1200px-Building92microsoft.jpg",
        address: "677 5th Ave, New York, NY 10022",
        description: "Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington. It develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services. Its best known software products are the Microsoft Windows line of operating systems, the Microsoft Office suite, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. In 2016, it was the world's largest software maker by revenue (currently Alphabet/Google has more revenue).[3] The word 'Microsoft' is a portmanteau of 'microcomputer' and 'software'. Microsoft is ranked No. 30 in the 2018 Fortune 500 rankings of the largest United States corporations by total revenue."
      }
    ]
    
    const students = [
      {
        firstName: "Charlie",
        lastName: "Smith",
        email: "charliesmith@gmail.com",
        imageUrl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lifestyle-bestdogbreeds-1577128927.png",
        gpa: 4.0,
        campusId: 1
      }, {
        firstName: "Max",
        lastName: "Williams",
        email: "maxwill@gmail.com",
        imageUrl: "https://www.dogsname.best/wp-content/uploads/2019/12/cute-dog-names.jpg",
        gpa: 3.8,
        campusId: 2
      }, {
        firstName: "Coco",
        lastName: "Brown",
        email: "cocobrownie@gmail.com",
        imageUrl: "https://ak8.picdn.net/shutterstock/videos/1012723298/thumb/1.jpg",
        gpa: 3.6,
        campusId: 3
      }, {
        firstName: "Rosie",
        lastName: "Taylor",
        email: "rosienotblackpink@gmail.com",
        imageUrl: "https://cdn5.littlethings.com/app/uploads/2017/05/cute-dog-names-1200.jpg",
        gpa: 3.4,
        campusId: 2
      }, {
        firstName: "Molly",
        lastName: "Baker",
        email: "hollymolly@gmail.com",
        imageUrl: "https://static.standard.co.uk/s3fs-public/thumbnails/image/2019/03/15/17/pixel-dogsofinstagram-3-15-19.jpg",
        gpa: 3.9,
        campusId: 1,
      }, {
        firstName: "Toby",
        lastName: "White",
        email: "tobywhite@gmail.com",
        imageUrl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dogs-that-dont-shed-1560974761.jpg",
        gpa: 3.6,
        campusId: 3
      }, {
        firstName: "Angel",
        lastName: "Lee",
        email: "anglelee@gmail.com",
        imageUrl: "https://thehappypuppysite.com/wp-content/uploads/2018/07/white-pomeranian-tall-910x1024.jpg",
        gpa: 3.8,
        campusId: 2
      }, {
        firstName: "Bella",
        lastName: "Collins",
        email: "bella12@gmail.com",
        imageUrl: "https://besthqwallpapers.com/Uploads/16-1-2018/37479/thumb2-pekingese-small-dog-cute-fluffy-dogs-4k-sofa.jpg",
        gpa: 3.7,
        campusId: 1
      }, {
        firstName: "Teddy",
        lastName: "Sanders",
        email: "teddynotbear@gmail.com",
        imageUrl: "https://i.kym-cdn.com/photos/images/facebook/001/607/299/939.jpeg",
        gpa: 4.0,
        campusId: 3
      }, {
        firstName: "Mini",
        lastName: "Parker",
        email: "tinymini@gmail.com",
        imageUrl: "https://www.petmd.com/sites/default/files/breedopedia/maltese3.jpg",
        gpa: 3.8,
        campusId: 2
      }
    ]
  
    return Campus.bulkCreate(campuses)
    .then(() => Student.bulkCreate(students))
    
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
