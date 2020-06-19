# **sei-project-1**

Project 1: Space Invaders - Rick and Morty Theme
Space invaders is an old school arcade style game. Mine being browser-based. The aim of the game is to shoot all the invading aliens using the spacebar before they reach you while dodging their incoming fire using the left and right arrow keys. 

This was my first project I did at General Assembly for the Software Immersive Course, built in 8 days, and also my first ever game I have built and real-life practice of the skills we had been practicing for only a month.
You can check it out here :
https://a-der.github.io/sei-project-1/

Or checkout the GitHub repo here to download:
https://github.com/A-Der/sei-project-1


# Brief
- Render the game in the broswer
- Select difficuty level by selecting which character to be


# Technologies Used
- HTML with Audio
- CSS
- JavaScript
- GitHub
- GoogleFonts


# **My Approach** # 

# Initial grid and players/enemies on screen
I thought the best way to display my players/enemies and go about desiging functions for their movement would be to create a grid as an array of divs. These divs were neatly packed together in a rectangular box and each alien or the player were displayed as having a CSS class assigned to that specific div. Aliens being in an array of their own.

![my screenshot](readme-images/grid.png)

# Movement
The movement for the player was very straight foward. The left arrow key would remove the CSS class of the players image, - 1 from their index and applying again the CSS image. It would be + 1 for the right arrow key and the keys would do nothing if the index of the player was at either edge of the grid and trying to go off the grid.

Movement for the aliens was more complex. I first defined the left and right edge of the grid. These were 2 separate arrays of the indexs of the divs on the left and right edge of the grid. 
Then using if statements I moved my array of aliens, starting from the left, until hitting the right edge. The logic being; if right edge contains a class of alien, then + the grid width to all the indexes of the aliens, so as to show them as moving downwatds in a vertical move. I then had other if statements in the same function to move my aliens - 1 repeatedly until hitting the left edge and so on until they either all get killed or hit the bottom row (where the player is) resulting in game over.

![my screenshot](readme-images/edges.png)



# Shooting and aliens bombing
For both the shots from my player to the aliens and bombs dropped from my aliens towards the player I used very similar logic as have been already.

When my player shoots, my function starts a timer takes the current index of my player and starting from 1 row above him (minusing 1 width as we are working from the bottom up) and assigns a CSS image of a laser shot while also triggering audio. This CSS image would continue minusing the width, going up the screen and at each instance would ask if the next div contains a class of the aliens. IF it did, then that alien would die, the timer Id would be cleared and points added to the score. If the laser reaches the top fo the grid without hitting any aliens then the timer Id would also be cleared but no points added.

For the bombs being dropped I used the exact same technique, a timer Id that goes across the screen very fast checking whether there is a class of the player in the div. This time though the bombs were being dropped from random aliens. I achieved this by using an array to filter out the aliens who were still alive and using Math.Random/Math.floor and multiplying it by the array length to get a random index of the array of alive aliens. I would then assign the bomb index as that + width and again, keep repeating this until it hits the player or the bottom of the grid. This bombs function was also wrapped in another timer so that bombs would be dropping continuously while the game is still being played.

![my screenshot](readme-images/bombs.png)

 # Audio 
 I really liked the idea of my game having plenty of audio, for laasers, for bombs, for choosing a character, for dying, for winning a level and having background music. I soon discovered I needed mutiple audio tags otherwise they would all just cut each other off. So I figured out what was the least amount I needed to make it work and which ones should be called for which function so as not to be cutting ech other off.

 ![my screenshot](readme-images/audio.png)

# Bugs
Some known bugs within my game :
Sometimes when the aliens reach the bottom of the grid it doesnt always trigger the game over.

In the middle of the grid the aliens move down before going once more to the left to be at the edge. This has to od with my aliens movement logic and defining when they should be jumping down or moving left or right.

# Wins and Challenges
My biggest obstacle by far was the movement of the aliens, keeping their image from reloading after dying and having the army of aliens still follow the movement function according to the aliens left alive not how many there were in total, which would always remain the same. I did this by turning my aliens into objects with a Current Index and Is Alive properties. So after one would be hit, ther Is Alive property would be turned to false

My biggest accomplishment was the hours of trial and error I endured, although I got to a dead end many many times I learned a lot about the methods, functions and how they work, their uses and limits, while also picking up useful ways to use methods that I perhaps hadnt thought of before which I can carry forward into my work.

![my screenshot](readme-images/finished.png)

# Future Content
Things I would like to implement:
- Use media queries this game can played on phones/tablets
- Being able to spawn more armies
- Other game modes where the aliens are non-stop and speed up over time
- A better scoreboard to keep track of previous scores not just the highest one overall
- 2nd player mode using W,S,D keys so 2 people can play at once and use the Shift button to shoot for the second player.