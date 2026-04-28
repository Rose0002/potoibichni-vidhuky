document.addEventListener("DOMContentLoaded", loadComments);

function addComment() {
    const input = document.getElementById('commentInput');
    if (input.value.trim() === "") return;

    const commentObj = { id: Date.now(), text: input.value };
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(commentObj);
    localStorage.setItem('comments', JSON.stringify(comments));

    renderComment(commentObj);
    input.value = "";
}

function loadComments() {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(renderComment);
}

function renderComment(obj) {
    const list = document.getElementById('commentsList');
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.setAttribute('data-id', obj.id);
    div.innerHTML = `<span class="delete-btn" onclick="deleteComment(${obj.id})">Видалити</span>
                     <strong>Гість:</strong> ${obj.text}`;
    list.prepend(div);
}

function deleteComment(id) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments = comments.filter(c => c.id !== id);
    localStorage.setItem('comments', JSON.stringify(comments));
    document.querySelector(`[data-id="${id}"]`).remove();
}

function createStars(e) {
    for (let i = 0; i < 6; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.innerHTML = '✨';
        star.style.left = e.pageX + (Math.random() - 0.5) * 60 + 'px';
        star.style.top = e.pageY + (Math.random() - 0.5) * 60 + 'px';
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 1000);
    }
}

function openContacts(e) {
    if (e) e.preventDefault();
    document.getElementById('contactsModal').style.display = 'flex';
}
function closeContacts() {
    document.getElementById('contactsModal').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('contactsModal');
    if (event.target == modal) closeContacts();
}

function toggleLike() {
    const btn = document.getElementById('likeBtn');
    const countSpan = document.getElementById('likeCount');
    if (!btn || !countSpan) return;

    btn.classList.toggle('active');
    let currentCount = parseInt(countSpan.innerText);

    if (btn.classList.contains('active')) {
        countSpan.innerText = currentCount + 1;
        btn.innerHTML = "❤ Ви оцінили"; 
    } else {
        countSpan.innerText = currentCount - 1;
        btn.innerHTML = "❤ Подобається";
    }
}
