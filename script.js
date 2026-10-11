let form = document.querySelector("form");
let inp1 = document.querySelector("#inp1");
let inp2 = document.querySelector("#inp2");
let inp3 = document.querySelector("#inp3");
let inp4 = document.querySelector("#inp4");
let table = document.querySelector("table");
let add = document.querySelector("#btn");
let arr = JSON.parse(localStorage.getItem("obj")) || [];
arr.forEach((e) => {
    table.innerHTML += `<tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.role}</td>
        <td>${e.salary}</td>
        <td><button type="button" id="${e.id}">edit</button></td>
        <td><button type="button" id="${e.id}">delete</button></td>
    </tr>`;
});
form.addEventListener("click", (e) => {
    if (e.target.innerText == "ADD") {
        e.preventDefault();
        if (
            inp1.value.trim() != "" &&
            inp2.value.trim() != "" &&
            inp3.value.trim() != "" &&
            inp4.value.trim() != ""
        ) {
            let obj = {
                id: inp1.value,
                name: inp2.value,
                role: inp3.value,
                salary: inp4.value
            };
            let x = arr.find((z) => z.id == obj.id);
            if (x) {
                alert("ID already exists");
            } else {
                arr.push(obj);
                localStorage.setItem("obj", JSON.stringify(arr));
                alert("Record added successfully");
                form.reset();
                location.reload();
            }
        } else {
            alert("Please fill in all fields");
        }
    }
    else if (e.target.innerText == "edit") {
        e.preventDefault();
        let row = e.target.parentElement.parentElement;
        inp1.value = row.children[0].innerText;
        inp2.value = row.children[1].innerText;
        inp3.value = row.children[2].innerText;
        inp4.value = row.children[3].innerText;
        inp1.disabled = true;
        e.target.innerText = "update";
    }
    else if (e.target.innerText == "update") {
        e.preventDefault();
        let x = arr.find((z) => z.id == e.target.id);
        if (x) {
            if (
                inp1.value.trim() != "" &&
                inp2.value.trim() != "" &&
                inp3.value.trim() != "" &&
                inp4.value.trim() != ""
            ) {
                x.name = inp2.value;
                x.role = inp3.value;
                x.salary = inp4.value;
                localStorage.setItem("obj", JSON.stringify(arr));
                alert("Record updated successfully");
                form.reset();
                inp1.disabled = false;
                location.reload();
            } else {
                alert("Please fill in all fields");
            }
        }
    }
    else if (e.target.innerText == "delete") {
        e.preventDefault();
        let x = arr.find((z) => z.id == e.target.id);
        if (x && confirm("Do you want to delete this record?")) {
            arr.splice(arr.indexOf(x), 1);
            localStorage.setItem("obj", JSON.stringify(arr));
            location.reload();
        }
    }
});
