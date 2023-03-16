// const users = [
//   {
//     id: 1,
//     name: "Quoc Khanh",
//   },
//   {
//     id: 2,
//     name: "Chi Kien",
//   },
//   {
//     id: 3,
//     name: "Nvdukkk",
//   },
// ];

// const comments = [
//   {
//     id: 1,
//     user_id: 1,
//     content: "Hello!",
//   },
//   {
//     id: 2,
//     user_id: 2,
//     content: "Hi!",
//   },
//   {
//     id: 3,
//     user_id: 1,
//     content: "Hello World!",
//   },
//   {
//     id: 4,
//     user_id: 2,
//     content: "Hello World 2!",
//   },
// ];

// const getComments = () =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(comments);
//     }, 1000);
//   });

// const getUsersByIds = (userIds) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       const result = users.filter((user) => userIds.includes(user.id));
//       resolve(result);
//     }, 1000);
//   });

// getComments().then((comments) => {
//   const userIds = comments.map((comment) => comment.user_id);
//   return getUsersByIds(userIds)
//     .then((users) => {
//       return {
//         users: users,
//         comments: comments,
//       };
//     })
//     .then((data) => {
//       const commentBlock = document.querySelector("#comment-block");
//       let html = "";
//       data.comments.forEach((comment) => {
//         const user = data.users.find((user) => {
//           return user.id === comment.user_id;
//         });
//         html += `<li>${user.name}: ${comment.content}</li>`;
//       });
//       commentBlock.innerHTML = html;
//     });
// });

// const postAPI = "https://jsonplaceholder.typicode.com/posts";

// fetch(postAPI)
//   .then((response) => response.json())
//   .then((posts) => {
//     let htmls = posts.map((post) => {
//       return `<li>
//                  <h2>${post.title}</h2>
//                  <p>${post.body}</p>
//               </li>`;
//     });
//     const html = htmls.join("");
//     const postBlock = document.querySelector("#post-block");
//     postBlock.innerHTML = html;
//   });

const listCourseBlock = document.querySelector("#courses-block");
const editBtn = document.querySelector("#edit");
const createBtn = document.querySelector("#create");
const coursesAPI = "http://localhost:3000/Courses";

function start() {
  getCourses(renderCourses);
  handleCreateForm();
}

start();

// Function

function getCourses(callback) {
  fetch(coursesAPI)
    .then((response) => response.json())
    .then(callback);
}

function createCourse(data, callback) {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(coursesAPI, option)
    .then((response) => response.json())
    .then(callback);
}

function handleDeteleCourse(id) {
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(coursesAPI + "/" + id, option)
    .then((response) => response.json())
    .then(() => {
      document.querySelector(`.course-item-${id}`).remove();
    });
}

function handleEditCourse(id, data, callback) {
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(coursesAPI + "/" + id, option)
    .then((response) => response.json())
    .then(callback);
}

function editCourse(id) {
  let name = document.querySelector('input[name="name"]');
  let description = document.querySelector('input[name="description"]');
  let nameValue = document.querySelector(`.course-item-${id} h3`).innerText;
  let descriptionValue = document.querySelector(
    `.course-item-${id} p`
  ).innerText;
  name.value = nameValue;
  description.value = descriptionValue;
  editBtn.onclick = () => {
    const formData = {
      name: name.value,
      description: description.value,
    };

    handleEditCourse(id, formData, () => {
      getCourses(renderCourses);
    });
    name.value = "";
    description.value = "";
  };
}

function renderCourses(courses) {
  let htmls = courses.map((course) => {
    return `<li class="course-item-${course.id}">
                <h3>${course.name}</h3>
                <p>${course.description}</p>
                <button onclick="handleDeteleCourse(${course.id})">&times;</button>
                <button onclick="editCourse(${course.id})">Edit</button>
            </li>`;
  });
  listCourseBlock.innerHTML = htmls.join("");
}

function handleCreateForm() {
  createBtn.onclick = () => {
    const name = document.querySelector('input[name="name"]').value;
    const description = document.querySelector(
      'input[name="description"]'
    ).value;
    const formData = {
      name: name,
      description: description,
    };

    createCourse(formData, () => {
      getCourses(renderCourses);
    });
  };
}
