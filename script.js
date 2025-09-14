// Sample NGO data
const ngos = [
  { name: "Helping Hands", location: "Delhi", focus: "Education" },
  { name: "Green Earth", location: "Bangalore", focus: "Environment" },
  { name: "Care4All", location: "Mumbai", focus: "Healthcare" }
];

// Update stats
document.getElementById("ngo-count").textContent = ngos.length;
document.getElementById("project-count").textContent = 12; // sample value
document.getElementById("volunteer-count").textContent = 85; // sample value

// Populate NGO table
const tableBody = document.querySelector("#ngo-table tbody");
ngos.forEach(ngo => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${ngo.name}</td>
    <td>${ngo.location}</td>
    <td>${ngo.focus}</td>
  `;
  tableBody.appendChild(row);
});
