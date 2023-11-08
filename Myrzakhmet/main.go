package main

import (
	"crypto/sha256"
	"fmt"
	"strings"
)

const alphabet string = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9"

func main() {
	// создаем массив символом что бы передать
	alpha := strings.Split(alphabet, " ")
	// вызываем функцию searchHash, лимит можно указать любой
	word, hash := searchHash("teacher+", &alpha, 4)
	fmt.Printf("word: %s\nhash: %s", word, hash)
}

func searchHash(prefix string, alpha *[]string, limit int) (word, hash string) {

	// ограничитель что бы оно не вызывалась вечно
	if limit == 0 {
		return "", ""
	}

	// сперва ишем можно ли найти нужный хэш если добавить всего один символ в конце
	for _, ch := range *alpha {
		temp := prefix + ch
		// находим хэш
		sum := sha256.Sum256([]byte(temp))
		// преобразовываем в строку
		x := fmt.Sprintf("%x", sum)
		// если хэш подходит возвращаем слово и хэш
		if strings.HasPrefix(x, "00000") {
			return temp, x
		}
	}

	/*
		если же прибавив один символ мы не нашли нужный хэш
		будем искать его рекурсивно вызывая эту функцию меняя prefix
	*/
	for _, ch := range *alpha {
		temp := prefix + ch
		word, hash = searchHash(temp, alpha, limit-1)
		if strings.HasPrefix(hash, "00000") {
			break
		}
	}

	// так как функция возвращает именновонные переменные достаточно указать return
	return
}
