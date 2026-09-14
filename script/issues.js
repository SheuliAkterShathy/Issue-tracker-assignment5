const issuesContainer = document.getElementById("IssuesContainer");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("close-btn");
const loading = document.getElementById("loading");
const issueModal = document.getElementById("issue_modal");

let totalIssueLength = document.getElementById("totalIssueLength");
let allIssues = [];

// set-selected-button
const setSelectedButton = (selected) => {
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  selected.classList.add("btn-primary");
};

// all-button
allBtn.addEventListener("click", () => {
  setSelectedButton(allBtn);
  totalIssueLength.innerText = allIssues.length;
  displayIssues(allIssues);
});

// open-button
openBtn.addEventListener("click", () => {
  setSelectedButton(openBtn);

  const openIssues = allIssues.filter((issue) => issue.status === "open");
  totalIssueLength.innerText = openIssues.length;
  displayIssues(openIssues);
});

// closed-button
closedBtn.addEventListener("click", () => {
  setSelectedButton(closedBtn);
  const closedIssues = allIssues.filter((issue) => issue.status === "closed");
  totalIssueLength.innerText = closedIssues.length;
  displayIssues(closedIssues);
});


// modal

const openIssueModal = async(issueId) =>{
   const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`
  );

  const data = await res.json();

  const issue = data.data;
  


 issueModal.innerHTML = `
    <div class="modal-box max-w-2xl p-7 rounded-2xl">

      <!-- Close Icon -->
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-500"
        >
          ✕
        </button>
      </form>

      <!-- Title -->
      <h3 class="text-2xl font-bold text-gray-800">
        ${issue.title}
      </h3>

      <!-- Status -->
      <div class="flex items-center gap-2 mt-3 text-sm text-gray-500">
        <span class="badge badge-success text-white">
          ● ${issue.status}
        </span>

        <span>•</span>

        <span>Opened by ${issue.author}</span>

        <span>•</span>

        <span>${issue.createdAt}</span>
      </div>

      <!-- Labels -->
      <div class="flex gap-3 mt-5">
        ${issue.labels
          .map(
            (label) => `
              <span class="badge badge-error badge-outline px-4 py-3">
                ${label}
              </span>
            `
          )
          .join("")}
      </div>

      <!-- Description -->
      <p class="text-gray-500 leading-7 mt-5">
        ${issue.description}
      </p>

      <!-- Assignee & Priority -->
      <div class="bg-slate-50 rounded-xl p-5 mt-6 flex items-center">

        <!-- Assignee -->
        <div class="w-1/2">
          <p class="text-gray-500 text-sm">Assignee:</p>

          <p class="font-bold text-gray-800 mt-1">
            ${issue.assignee}
          </p>
        </div>

        <!-- Divider -->
        <div class="divider divider-horizontal"></div>

        <!-- Priority -->
        <div class="w-1/2">
          <p class="text-gray-500 text-sm">Priority:</p>

          <span class="badge badge-error text-white mt-1">
            ${issue.priority}
          </span>
        </div>
      </div>

      <!-- Close Button -->
      <div class="modal-action">
        <form method="dialog">
          <button
            class="btn bg-purple-600 hover:bg-purple-700 text-white border-none px-8"
          >
            Close
          </button>
        </form>
      </div>

    </div>

    <!-- Background -->
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  `;



 issueModal.showModal()

}
const createElements = (arr) => {
  const htmlElements = arr.map(
    (el) =>
      `<button class ="mr-2 px-2 py-1 rounded-lg ${el === "bug" ? "bg-red-400" : el === "help wanted" ? "bg-orange-300" : "bg-green-400"}">${el}<button/>`,
  );
  return htmlElements.join(" ");
};

async function loadIssues() {
  loading.classList.remove("hidden");
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues`,
  );
  const data = await res.json();
  const allData = data.data;
  allIssues = allData;

  displayIssues(allIssues);
  loading.classList.add("hidden");
}
function displayIssues(issues) {
  issuesContainer.innerHTML = " ";
  issues.forEach((issue) => {
    const div = document.createElement("div");
    div.className = `border-t-3 rounded-md ${issue.status === "open"?"border-green-500":"border-purple-600"}`
    div.innerHTML = `
    
     <div class="bg-white shadow p-4 rounded-md card h-full cursor-pointer">
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

       // Card click → Modal
    div.addEventListener("click", () => {
      openIssueModal(issue.id);
    });
    issuesContainer.appendChild(div);
  });
}
loadIssues();
// displayIssues()
