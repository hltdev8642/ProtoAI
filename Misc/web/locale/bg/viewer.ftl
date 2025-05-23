# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Предишна страница
pdfjs-previous-button-label = Предишна
pdfjs-next-button =
    .title = Следваща страница
pdfjs-next-button-label = Следваща
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Страница
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = от { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } от { $pagesCount })
pdfjs-zoom-out-button =
    .title = Намаляване
pdfjs-zoom-out-button-label = Намаляване
pdfjs-zoom-in-button =
    .title = Увеличаване
pdfjs-zoom-in-button-label = Увеличаване
pdfjs-zoom-select =
    .title = Мащабиране
pdfjs-presentation-mode-button =
    .title = Превключване към режим на представяне
pdfjs-presentation-mode-button-label = Режим на представяне
pdfjs-open-file-button =
    .title = Отваряне на файл
pdfjs-open-file-button-label = Отваряне
pdfjs-print-button =
    .title = Отпечатване
pdfjs-print-button-label = Отпечатване

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Инструменти
pdfjs-tools-button-label = Инструменти
pdfjs-first-page-button =
    .title = Към първата страница
pdfjs-first-page-button-label = Към първата страница
pdfjs-last-page-button =
    .title = Към последната страница
pdfjs-last-page-button-label = Към последната страница
pdfjs-page-rotate-cw-button =
    .title = Завъртане по час. стрелка
pdfjs-page-rotate-cw-button-label = Завъртане по часовниковата стрелка
pdfjs-page-rotate-ccw-button =
    .title = Завъртане обратно на час. стрелка
pdfjs-page-rotate-ccw-button-label = Завъртане обратно на часовниковата стрелка
pdfjs-cursor-text-select-tool-button =
    .title = Включване на инструмента за избор на текст
pdfjs-cursor-text-select-tool-button-label = Инструмент за избор на текст
pdfjs-cursor-hand-tool-button =
    .title = Включване на инструмента ръка
pdfjs-cursor-hand-tool-button-label = Инструмент ръка
pdfjs-scroll-vertical-button =
    .title = Използване на вертикално плъзгане
pdfjs-scroll-vertical-button-label = Вертикално плъзгане
pdfjs-scroll-horizontal-button =
    .title = Използване на хоризонтално
pdfjs-scroll-horizontal-button-label = Хоризонтално плъзгане
pdfjs-scroll-wrapped-button =
    .title = Използване на мащабируемо плъзгане
pdfjs-scroll-wrapped-button-label = Мащабируемо плъзгане
pdfjs-spread-none-button =
    .title = Режимът на сдвояване е изключен
pdfjs-spread-none-button-label = Без сдвояване
pdfjs-spread-odd-button =
    .title = Сдвояване, започвайки от нечетните страници
pdfjs-spread-odd-button-label = Нечетните отляво
pdfjs-spread-even-button =
    .title = Сдвояване, започвайки от четните страници
pdfjs-spread-even-button-label = Четните отляво

## Document properties dialog

pdfjs-document-properties-button =
    .title = Свойства на документа…
pdfjs-document-properties-button-label = Свойства на документа…
pdfjs-document-properties-file-name = Име на файл:
pdfjs-document-properties-file-size = Големина на файл:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } КБ ({ $size_b } байта)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } МБ ({ $size_b } байта)
pdfjs-document-properties-title = Заглавие:
pdfjs-document-properties-author = Автор:
pdfjs-document-properties-subject = Тема:
pdfjs-document-properties-keywords = Ключови думи:
pdfjs-document-properties-creation-date = Дата на създаване:
pdfjs-document-properties-modification-date = Дата на промяна:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = Създател:
pdfjs-document-properties-producer = PDF произведен от:
pdfjs-document-properties-version = Издание на PDF:
pdfjs-document-properties-page-count = Брой страници:
pdfjs-document-properties-page-size = Размер на страницата:
pdfjs-document-properties-page-size-unit-inches = инч
pdfjs-document-properties-page-size-unit-millimeters = мм
pdfjs-document-properties-page-size-orientation-portrait = портрет
pdfjs-document-properties-page-size-orientation-landscape = пейзаж
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Letter
pdfjs-document-properties-page-size-name-legal = Правни въпроси

## Variables:
##   $width (Number) - the width of the (current) page
##   $height (Number) - the height of the (current) page
##   $unit (String) - the unit of measurement of the (current) page
##   $name (String) - the name of the (current) page
##   $orientation (String) - the orientation of the (current) page

pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width } × { $height } { $unit } ({ $name }, { $orientation })

##

# The linearization status of the document; usually called "Fast Web View" in
# English locales of Adobe software.
pdfjs-document-properties-linearized = Бърз преглед:
pdfjs-document-properties-linearized-yes = Да
pdfjs-document-properties-linearized-no = Не
pdfjs-document-properties-close-button = Затваряне

## Print

pdfjs-print-progress-message = Подготвяне на документа за отпечатване…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Отказ
pdfjs-printing-not-supported = Внимание: Този четец няма пълна поддръжка на отпечатване.
pdfjs-printing-not-ready = Внимание: Този PDF файл не е напълно зареден за печат.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Превключване на страничната лента
pdfjs-toggle-sidebar-button-label = Превключване на страничната лента
pdfjs-document-outline-button =
    .title = Показване на структурата на документа (двукратно щракване за свиване/разгъване на всичко)
pdfjs-document-outline-button-label = Структура на документа
pdfjs-attachments-button =
    .title = Показване на притурките
pdfjs-attachments-button-label = Притурки
pdfjs-thumbs-button =
    .title = Показване на миниатюрите
pdfjs-thumbs-button-label = Миниатюри
pdfjs-findbar-button =
    .title = Намиране в документа
pdfjs-findbar-button-label = Търсене

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Страница { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Миниатюра на страница { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = Търсене
    .placeholder = Търсене в документа…
pdfjs-find-previous-button =
    .title = Намиране на предишно съвпадение на фразата
pdfjs-find-previous-button-label = Предишна
pdfjs-find-next-button =
    .title = Намиране на следващо съвпадение на фразата
pdfjs-find-next-button-label = Следваща
pdfjs-find-highlight-checkbox = Открояване на всички
pdfjs-find-match-case-checkbox-label = Съвпадение на регистъра
pdfjs-find-entire-word-checkbox-label = Цели думи
pdfjs-find-reached-top = Достигнато е началото на документа, продължаване от края
pdfjs-find-reached-bottom = Достигнат е краят на документа, продължаване от началото
pdfjs-find-not-found = Фразата не е намерена

## Predefined zoom values

pdfjs-page-scale-width = Ширина на страницата
pdfjs-page-scale-fit = Вместване в страницата
pdfjs-page-scale-auto = Автоматично мащабиране
pdfjs-page-scale-actual = Действителен размер
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = Получи се грешка при зареждане на PDF-а.
pdfjs-invalid-file-error = Невалиден или повреден PDF файл.
pdfjs-missing-file-error = Липсващ PDF файл.
pdfjs-unexpected-response-error = Неочакван отговор от сървъра.
pdfjs-rendering-error = Грешка при изчертаване на страницата.

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [Анотация { $type }]

## Password

pdfjs-password-label = Въведете парола за отваряне на този PDF файл.
pdfjs-password-invalid = Невалидна парола. Моля, опитайте отново.
pdfjs-password-ok-button = Добре
pdfjs-password-cancel-button = Отказ
pdfjs-web-fonts-disabled = Уеб-шрифтовете са забранени: разрешаване на използването на вградените PDF шрифтове.

## Editing


## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.

