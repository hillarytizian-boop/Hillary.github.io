// Database
let posts = JSON.parse(localStorage.getItem("posts")) || [];
function save(){localStorage.setItem("posts",JSON.stringify(posts));render();renderAdmin();}

// Schedule Post
function schedulePost(){
  let text=document.getElementById("text").value;
  let time=document.getElementById("time").value;
  let platform=document.getElementById("platform").value;
  if(text===""){document.getElementById("status").innerText="Post cannot be empty";return;}
  posts.push({text,time,platform,status:"Scheduled"});
  document.getElementById("status").innerText="Post scheduled!";
  save();
}

// Render Posts
function render(){
  let html="";
  posts.forEach((p,i)=>{
    html+=`<div class="post"><b>${p.platform}</b><br>${p.text}<br><small>${p.time}</small><br><small>Status: ${p.status}</small></div>`;
  });
  document.getElementById("posts").innerHTML=html;
}

// Admin Panel
function renderAdmin(){
  if(!document.getElementById("adminPosts")) return;
  let html="<div class='admin'><b>All Posts:</b><br>";
  posts.forEach((p,i)=>{
    html+=`<div><b>${p.platform}</b> | ${p.text} | ${p.time} | Status: ${p.status} 
    <button onclick="deletePost(${i})">Delete</button></div>`;
  });
  html+="</div>";
  document.getElementById("adminPosts").innerHTML=html;
}
function deletePost(index){posts.splice(index,1);save();}

// Simulated Auto Post
setInterval(()=>{
  let now=new Date();
  posts.forEach(p=>{
    if(p.status==="Scheduled" && new Date(p.time)<=now){
      p.status="Published";
      if(p.platform==="TikTok"){console.log("Simulated TikTok Post:",p.text);}
      if(p.platform==="WhatsApp"){console.log("Simulated WhatsApp Post:",p.text);}
      save();
    }
  });
},5000);

// AI Caption
function caption(){
  let topic=document.getElementById("topic").value;
  let captions=[
    "🔥 "+topic+" is trending right now!",
    "Everyone is talking about "+topic,
    "Don't miss this "+topic+" moment",
    topic+" content going viral",
    "Next level "+topic+" post"
  ];
  let random=captions[Math.floor(Math.random()*captions.length)];
  document.getElementById("captionResult").innerText=random;
}

// Analytics Chart
new Chart(document.getElementById("chart"),{
  type:'bar',
  data:{
    labels:["6AM","9AM","12PM","3PM","6PM","9PM"],
    datasets:[{label:"Users Online",data:[20,40,30,50,90,120]}]
  }
});

// Best Posting Time
function bestTime(){
  let times=["6PM","7PM","8PM","9PM"];
  let r=times[Math.floor(Math.random()*times.length)];
  document.getElementById("best").innerText="Best time: "+r;
}

// Initial render
render();renderAdmin();