# Ask for the day
echo What day is it? 
read day 

# Create a new folder with the day name
cd src 
mkdir $day 

# Create new files for part1 and part2
cd $day 
touch part1.ts part2.ts
echo 'export const part1 = "not determined yet";' > part1.ts
echo 'export const part2 = "not determined yet";' > part2.ts