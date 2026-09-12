const IssuesContainer = document.getElementById("IssuesContainer");
const allIssuesBtn = document.getElementById("allIssuesBtn");

// allIssuesBtn.addEventListener("click",async() =>{

// })

async function loadIssues(){
      const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues`,
  );
  const data = await res.json();
  displayIssues(data.data);
}
function displayIssues (issues){
 issues.forEach(issue => {

    const div = document.createElement("div");
    div.innerHTML = `
    
     <div class="bg-white shadow p-4 rounded-md h-full">
            <div class="flex justify-between">
              <img class="w-6 h-6" src="./assets/Open-Status.png" alt="" />
              <button class="btn">high</button>
            </div>
            <h2 class="font-semibold">${issue.title}</h2>
            <p class="my-2 line-clamp-2">${issue.description}</p>
            <div class="badge badge-success">

              Success
            </div>
            <div class="badge badge-warning">

              Warning
            </div>
            
            <hr class="my-4 border-gray-400">
            <p>by jon doe</p>
            <p>1/1/23</p>
          </div>
    
    
    `
    IssuesContainer.appendChild(div);
 });
}
loadIssues()
// displayIssues()