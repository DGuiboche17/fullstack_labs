document.addEventListener("DOMContentLoaded", () => { // is the page loaded?
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
    const departments = [
    {
      name: "Administration",
      employees: [
        { firstName: "Zoë", lastName: "Robins" },
        { firstName: "Madeleine", lastName: "Madden" }
      ]
    },
    {
      name: "Audit",
      employees: [
        { firstName: "Josha", lastName: "Sadowski" },
        { firstName: "Kate", lastName: "Fleetwood" }
      ]
    },
    {
      name: "Banking Operations",
      employees: [
        { firstName: "Priyanka", lastName: "Bose" },
        { firstName: "Hammed", lastName: "Animashaun" },
        { firstName: "Álvaro", lastName: "Morte" },
        { firstName: "Taylor", lastName: "Napier" },
        { firstName: "Alan", lastName: "Simmonds" }
      ]
    },
    {
      name: "Communications",
      employees: [
        { firstName: "Gil", lastName: "Cardinal" },
        { firstName: "Richard J.", lastName: "Lewis" }
      ]
    },
    {
      name: "Corporate Services",
      employees: [
        { firstName: "Randy", lastName: "Bradshaw" },
        { firstName: "Tracey", lastName: "Cook" },
        { firstName: "Lubomir", lastName: "Mykytiuk" }
      ]
    },
    {
      name: "Facilities",
      employees: [
        { firstName: "Dakota", lastName: "House" },
        { firstName: "Lori Lea", lastName: "Okemah" },
        { firstName: "Renae", lastName: "Morrisseau" },
        { firstName: "Rick", lastName: "Belcourt" }
      ]
    },
    {
      name: "Financial Services",
      employees: [
        { firstName: "Selina", lastName: "Hanusa" },
        { firstName: "Buffy", lastName: "Gaudry" },
        { firstName: "Shaneen Ann", lastName: "Fox" },
        { firstName: "Allan", lastName: "Little" },
        { firstName: "Danny", lastName: "Rabbit" }
      ]
    },
    {
      name: "Human Resources",
      employees: [
        { firstName: "Jesse", lastName: "Ed Azure" },
        { firstName: "Stacy", lastName: "Da Silva" },
        { firstName: "Vladimír", lastName: "Valenta" },
        { firstName: "Samone", lastName: "Sayeses-Whitney" },
        { firstName: "Paul", lastName: "Coeur" }
      ]
    },
    {
      name: "Information Technology",
      employees: [
        { firstName: "Graham", lastName: "Greene" },
        { firstName: "Sandika", lastName: "Evergreen" },
        { firstName: "Jennifer", lastName: "Rodriguez (Software Developer)" },
        { firstName: "Aiyana", lastName: "Littlebear" },
        { firstName: "Inara", lastName: "Thunderbird" },
        { firstName: "Kaya", lastName: "Runningbrook" },
        { firstName: "Elara", lastName: "Firehawk" },
        { firstName: "Siona", lastName: "Moonflower" },
        { firstName: "Kaiyu", lastName: "Greywolf" },
        { firstName: "Ayawamat", lastName: "Nightwind" },
        { firstName: "Tala", lastName: "Braveheart" },
        { firstName: "Iniko", lastName: "Stonebear" },
        { firstName: "Onatah", lastName: "Redhawk" } 
      ]
    }
  ];

  const main = document.getElementById("employee-directory"); //this is where we will put the content

  departments.forEach((department) => {
    const section = document.createElement("section"); // each department gets its own section

    const heading = document.createElement("h2"); // department name as heading
    heading.textContent = department.name;

    const list = document.createElement("ul");

    department.employees.forEach((employee) => {
      const listItem = document.createElement("li");
      listItem.textContent = employee.lastName
        ? `${employee.firstName} ${employee.lastName}`
        : employee.firstName;
      list.appendChild(listItem);
    });

    section.appendChild(heading);
    section.appendChild(list);
    main.appendChild(section);
  });
});
