# 🌸 Romantic Web Game — "Adventure for Katya"

## Project Goal

Create a small interactive romantic web game dedicated to **Katya** for **March 8**.

The player goes through a small adventure solving riddles, completing mini-games, and collecting pieces of a heart puzzle.
When all pieces are collected, the final congratulation message opens.

The site should feel like a **romantic interactive quest** lasting about **7–10 minutes**.

Technologies:

* HTML
* CSS
* JavaScript

Deployment:

* GitHub Pages

---

# 🎮 Game Core Mechanic

Throughout the game Katya collects **8 pieces of a heart puzzle**.

Each puzzle piece is obtained after completing a task:

* solving a riddle
* mini-game
* interaction

When all pieces are collected, the **heart puzzle assembles** and unlocks the final message.

---

# 🗺 Game Flow

1. Welcome screen
2. Hidden heart search
3. Riddle #1
4. Mini-game: catch hearts
5. Puzzle piece
6. Riddle #2
7. Drag-and-drop puzzle
8. Memory mini-game
9. Riddle #3
10. Secret chest
11. Final heart assembly
12. Congratulations scene

---

# 🌸 Scene Descriptions

## 1. Welcome Screen

Title:

"С 8 марта, Катя 🌸"

Text:

"Я приготовил для тебя небольшое приключение.
Чтобы открыть поздравление, нужно собрать сердце."

Button:

**Начать приключение**

Visual effects:

* falling petals
* parallax background
* glowing button

---

# 🔍 2. Hidden Object

On screen appear:

* flowers
* stars
* clouds
* leaves

Only **one hidden heart**.

Task:

Find and click the heart.

Result:

"Ты нашла первую частичку любви ❤️"

Heart piece added to progress bar.

---

# 🧠 3. Riddle #1

Text:

"Утром его ищут,
вечером о нём мечтают.
А без него день кажется пустым."

Options:

* кофе
* поцелуй
* объятия

Correct answer:

**объятия**

Reward:

Heart puzzle piece.

---

# ❤️ 4. Mini Game — Catch Hearts

Hearts fall from top of screen.

Goal:

Collect **7 hearts**.

Mechanics:

* hearts spawn randomly
* click to collect
* counter shows progress

After success:

"You collected enough love ❤️"

---

# 🧩 5. Real Puzzle (Drag & Drop)

A heart image is split into **6 pieces**.

Pieces are scattered randomly.

User must drag pieces into correct positions.

Implementation idea:

* HTML elements with draggable attribute
* drop zones
* snap animation

When completed:

Heart glows and breaks into puzzle pieces that go to the collection.

---

# 🧠 6. Riddle #2

"Что можно подарить человеку,
не имея ничего в руках?"

Options:

* улыбку
* деньги
* цветы

Correct:

**улыбку**

---

# 🧠 7. Riddle #3

"Оно бьётся,
но его нельзя услышать,
когда рядом любимый человек."

Answer:

**сердце**

---

# 🎴 8. Memory Mini Game

Cards face down.

When clicked they flip.

Goal:

Find matching hearts.

Grid:

4x3 cards.

Matching pairs:

* heart
* flower
* star
* envelope
* ring
* smile

After completing:

Another puzzle piece.

---

# 🎁 9. Mystery Box

Three gift boxes appear.

Only **one contains the reward**.

Click animation:

* box opens
* hearts fly out

Text:

"Ты нашла подарок 💌"

---

# 🌸 10. Riddle Set (Additional)

Optional riddles to randomly display:

### Riddle A

"Что становится больше,
если им делиться?"

Answer:

**любовь**

---

### Riddle B

"Его нельзя увидеть,
но можно почувствовать."

Answer:

**тепло**

---

### Riddle C

"Что может сделать день лучше
всего одним сообщением?"

Answer:

**любовное сообщение**

---

### Riddle D

"Без него невозможно жить,
но его нельзя купить."

Answer:

**любовь**

---

# ❤️ Final Scene — Heart Assembly

All puzzle pieces fly together forming a **complete heart**.

Animation:

* glowing particles
* falling petals
* soft music

---

# 💌 Final Message

"Катя, с 8 марта 🌸

Спасибо тебе за тепло,
за улыбки и за те моменты,
которые делают мою жизнь счастливее.

Каждый день рядом с тобой
становится особенным.

Пусть у тебя всегда будет повод улыбаться,
а я постараюсь делать для этого всё возможное.

Ты очень важна для меня ❤️"

Button:

**Нажми**

When pressed:

Heart explosion animation.

Final text:

"Я тебя люблю ❤️"

---

# 🥚 Secret Easter Egg

Hidden interaction:

If user clicks background **10 times**, a secret appears.

Message:

"Ты нашла секрет ❤️"

Animation:

small heart rain.

---

# 🎨 Visual Style

Theme:

Romantic pink.

Colors:

Primary:

#ffb6c1

Accent:

#ff6fa5

Glow:

#ffd6e7

Background:

Soft gradient pink.

Fonts:

* Poppins
* Quicksand

---

# ✨ Visual Effects

### Falling Petals

Cherry blossom petals falling continuously.

### Parallax

Background reacts to mouse movement.

### Glow Buttons

Buttons glow softly.

### Heart Particles

Small hearts appear on clicks.

---

# 📁 Project Structure

```
8march-katya-game/

index.html
style.css
script.js

/assets
    /images
    /puzzle
    /icons
    /audio
```

---

# 🌐 Deployment

Deploy via GitHub Pages.

Example:

```
https://username.github.io/katya-8march
```

---

# 💖 Project Idea

This project is a **small romantic interactive adventure** made specifically for Katya as a surprise gift for March 8.
