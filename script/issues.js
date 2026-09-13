const issuesContainer = document.getElementById("IssuesContainer");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
let allIssues = [];

allBtn.addEventListener("click", () => {
  displayIssues(allIssues);
});
openBtn.addEventListener("click", () => {
  const openIssues = allIssues.filter((issue) => issue.status === "open");

  displayIssues(openIssues);
});
closeBtn.addEventListener("click", () => {
 const closedIssues = allIssues.filter(
  (issue) => issue.status ==="closed"
);

displayIssues(closedIssues);
});



const createElements = (arr) => {
  const htmlElements = arr.map(
    (el) =>
      `<button class ="mr-2 px-2 py-1 rounded-lg ${el === "bug" ? "bg-red-400" : el === "help wanted" ? "bg-orange-300" : "bg-green-400"}">${el}<button/>`,
  );
  return htmlElements.join(" ");
};

async function loadIssues() {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues`,
  );
  const data = await res.json();
  const allData = data.data;
  allIssues = allData;

  displayIssues(allIssues);
}
function displayIssues(issues) {
  issuesContainer.innerHTML = " ";
  issues.forEach((issue) => {
    const div = document.createElement("div");
    div.innerHTML = `
    
     <div class="bg-white shadow p-4 rounded-md card h-full">
            <div class="flex justify-between">
              <img class="w-6 h-6"    src="${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="" />
              <button class="btn">${issue.priority}</button>
            </div>
            <h2 class="font-semibold h-12">${issue.title}</h2>
            <p class="my-2 line-clamp-2">${issue.description}</p>
           
            <div>
             ${createElements(issue.labels)}
              
            </div>
            
           
            
            <hr class="my-4 border-gray-400">
            <p># ${issue.author}</p>
            <p>${issue.createdAt}</p>
          </div>
    
    
    `;
    issuesContainer.appendChild(div);
  });
}
loadIssues();
// displayIssues()
