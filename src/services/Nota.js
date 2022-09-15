import { db } from "./SQLite";

export function criaTabela() {
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "Notas " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);")
    })
}

export async function adicionarNota(note) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("INSERT INTO Notas (titulo, categoria, texto) VALUES (?, ?, ?);", [note.titulo, note.categoria, note.texto], () => {
                resolve("Nota adicionada com sucesso");
            })
        })
    })
}

export async function buscarNotas() {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("SELECT * FROM Notas;", [], (transaction, resultado) => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function atualizarNota(note) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("UPDATE Notas SET titulo = ?, categoria = ?, texto = ?, WHERE id = ?;", [note.titulo, note.categoria, note.texto, note.id], () => {
                resolve("Nota atualizada com sucesso");
            })
        })
    })
}

export async function removeNota(note) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("DELETE FROM Notas WHERE id = ?;", [note.id], () => {
                resolve("Nota removida com sucesso");
            })
        })
    })
}