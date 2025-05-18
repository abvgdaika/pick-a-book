
const books = {
    serious: [
        { title: "Старик и море", author: "Эрнест Хемингуэй" },
        { title: "Анна Каренина", author: "Лев Толстой" },
        { title: "Мастер и Маргарита", author: "Михаил Булгаков" }
    ],
    ya: [
        { title: "Гарри Поттер и философский камень", author: "Джоан Роулинг" },
        { title: "Артемис Фаул", author: "Йон Колфер" },
        { title: "Девочка-находка", author: "Жаклин Уилсон" }
    ],
    detective: [
        { title: "Убийство Роджера Экройда", author: "Агата Кристи" },
        { title: "Молчание ягнят", author: "Томас Харрис" },
        { title: "Шпион, пришедший с холода", author: "Джон Ле Карре" }
    ],
    thriller: [
        { title: "Оно", author: "Стивен Кинг" },
        { title: "Зелёная миля", author: "Стивен Кинг" },
        { title: "Американский психопат", author: "Брет Истон Эллис" }
    ]
};

async function recommend(category) {
    const book = books[category][Math.floor(Math.random() * books[category].length)];
    const query = `${book.title} ${book.author}`;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    const item = data.items?.[0];

    const description = item?.volumeInfo?.description || "Описание недоступно.";
    const image = item?.volumeInfo?.imageLinks?.thumbnail || "";

    document.getElementById("result").innerHTML = `
        <h2>«${book.title}» — ${book.author}</h2>
        <p>${description}</p>
        ${image ? `<img id="book-cover" src="${image}" alt="Обложка книги">` : ""}
    `;
}
