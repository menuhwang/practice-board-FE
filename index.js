$('.registe').hide();
$('.post').hide();
getAll();
async function getAll() {
    let response = await fetch("http://localhost:8080/api/v1/posts");
    if (response.ok) {
        let data = await response.json();
        console.log(data);
        let list = data.content;
        console.log(list);
        console.log(list.length);
        $('.contents-table-body').html("");
        for (let i = 0; i < list.length; i++) {
            $('.contents-table-body').html($('.contents-table-body').html()+ `
                <tr onClick="readPost(${list[i].id})">
                    <td>${list[i].id}</td>
                    <td>${list[i].author}</td>
                    <td>${list[i].title}</td>
                </tr>`)
        }
    }
}
function goBack() {
    $('.board').show();
    $('.post').hide();
}
function clearForm() {
    $('#author').val("");
    $('#password').val("");
    $('#title').val("");
    $('#contents').val("");
}
async function readPost(id) {
    let response = await fetch("http://localhost:8080/api/v1/posts/" + id);
    if (response.ok) {
        let data = await response.json();
        console.log(data)
        $('.board').hide();
        $('.post').show();
        $('#post-title').html(data.title);
        $('#post-contents').html(data.contents);
        $('#post-author').html(data.author);
        $('.replies').html("");
        for (let i = 0; i < data.replies.length; i++) {
            $('.replies').html($('.replies').html() + `
            <div class="reply">
                <p class="reply-author">${data.replies[i].author}</p>
                <p class="reply-contents">${data.replies[i].contents}</p>
            </div>`)
        }
    } else {
        alert("데이터 로딩 실패.")
    }
}
function registe() {
    $('.board').hide();
    $('.registe').show();
}
function registeCancel() {
    $('.board').show();
    $('.registe').hide();
}
async function registePost() {
    const data = {
        author: $('#author').val(), 
        title: $('#title').val(), 
        password: $('#password').val(),
        contents: $('#contents').val() 
    }
    console.log(JSON.stringify(data));
    let response = await fetch("http://localhost:8080/api/v1/posts", {
        method: 'POST', // *GET, POST, PUT, DELETE 등
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data) // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    })
    if (response.ok) {
        alert("등록 완료.")
        clearForm();
        registeCancel();
        getAll();
    } else {
        alert("등록 실패.")
    }
}