import { LetterData, NumberData, ColorData, ShapeData, AnimalData, RhymeData } from '../types';

export const ALPHABET_DATA: LetterData[] = [
  { letter: 'A', lowercase: 'a', word: 'Apple', phonics: 'ah', fact: 'Apples grow on big trees and can be red, green, or yellow!', color: 'bg-red-500', iconName: 'apple', category: 'fruit' },
  { letter: 'B', lowercase: 'b', word: 'Ball', phonics: 'buh', fact: 'Balls bounce high in the sky and roll across the grass!', color: 'bg-sky-500', iconName: 'ball', category: 'toy' },
  { letter: 'C', lowercase: 'c', word: 'Cat', phonics: 'kuh', fact: 'Cats have soft fur and say meow when they are happy!', color: 'bg-amber-500', iconName: 'cat', category: 'animal' },
  { letter: 'D', lowercase: 'd', word: 'Dog', phonics: 'duh', fact: 'Dogs love to wag their tails and play fetch with a ball!', color: 'bg-orange-500', iconName: 'dog', category: 'animal' },
  { letter: 'E', lowercase: 'e', word: 'Elephant', phonics: 'eh', fact: 'Elephants have huge ears and use their trunk like a nose and hand!', color: 'bg-indigo-400', iconName: 'elephant', category: 'animal' },
  { letter: 'F', lowercase: 'f', word: 'Fish', phonics: 'fuh', fact: 'Fish swim in rivers and oceans using their cute fins!', color: 'bg-teal-500', iconName: 'fish', category: 'ocean' },
  { letter: 'G', lowercase: 'g', word: 'Giraffe', phonics: 'juh', fact: 'Giraffes have very tall necks to reach yummy leaves high up!', color: 'bg-yellow-500', iconName: 'giraffe', category: 'animal' },
  { letter: 'H', lowercase: 'h', word: 'Hat', phonics: 'huh', fact: 'A warm hat keeps our heads cozy on chilly and sunny days!', color: 'bg-purple-500', iconName: 'hat', category: 'clothes' },
  { letter: 'I', lowercase: 'i', word: 'Ice Cream', phonics: 'eye', fact: 'Ice cream is sweet, cool, and comes in yummy strawberry or vanilla!', color: 'bg-pink-400', iconName: 'icecream', category: 'food' },
  { letter: 'J', lowercase: 'j', word: 'Jellyfish', phonics: 'juh', fact: 'Jellyfish glow softly and float like little umbrellas in the sea!', color: 'bg-cyan-400', iconName: 'jellyfish', category: 'ocean' },
  { letter: 'K', lowercase: 'k', word: 'Kite', phonics: 'kuh', fact: 'Kites dance with the wind high up in the blue sky!', color: 'bg-emerald-400', iconName: 'kite', category: 'toy' },
  { letter: 'L', lowercase: 'l', word: 'Lion', phonics: 'luh', fact: 'Lions have gorgeous fluffy manes and are known as the king of jungle!', color: 'bg-amber-600', iconName: 'lion', category: 'animal' },
  { letter: 'M', lowercase: 'm', word: 'Monkey', phonics: 'muh', fact: 'Monkeys love swinging on jungle branches and eating sweet bananas!', color: 'bg-yellow-600', iconName: 'monkey', category: 'animal' },
  { letter: 'N', lowercase: 'n', word: 'Nest', phonics: 'nuh', fact: 'Mama birds build cozy nests with twigs to keep their eggs safe!', color: 'bg-lime-600', iconName: 'nest', category: 'nature' },
  { letter: 'O', lowercase: 'o', word: 'Orange', phonics: 'aw', fact: 'Oranges are round, juicy, and packed with sunny vitamin C!', color: 'bg-orange-500', iconName: 'orange', category: 'fruit' },
  { letter: 'P', lowercase: 'p', word: 'Penguin', phonics: 'puh', fact: 'Penguins waddle across icy snow and slide on their bellies!', color: 'bg-slate-700', iconName: 'penguin', category: 'bird' },
  { letter: 'Q', lowercase: 'q', word: 'Queen', phonics: 'kwuh', fact: 'A Queen wears a sparkling gold crown with shiny jewels!', color: 'bg-violet-600', iconName: 'queen', category: 'people' },
  { letter: 'R', lowercase: 'r', word: 'Rainbow', phonics: 'ruh', fact: 'Rainbows appear in the sky when sunshine shines through rain drops!', color: 'bg-rose-500', iconName: 'rainbow', category: 'nature' },
  { letter: 'S', lowercase: 's', word: 'Sun', phonics: 'suh', fact: 'The sun warms our earth and helps plants, trees, and flowers grow!', color: 'bg-amber-400', iconName: 'sun', category: 'nature' },
  { letter: 'T', lowercase: 't', word: 'Train', phonics: 'tuh', fact: 'Trains go chugga-chugga-choo-choo along shiny train tracks!', color: 'bg-blue-600', iconName: 'train', category: 'vehicle' },
  { letter: 'U', lowercase: 'u', word: 'Umbrella', phonics: 'uh', fact: 'An umbrella keeps us dry when pitter-patter rain falls!', color: 'bg-fuchsia-500', iconName: 'umbrella', category: 'object' },
  { letter: 'V', lowercase: 'v', word: 'Violin', phonics: 'vuh', fact: 'A violin makes sweet musical melodies when played with a bow!', color: 'bg-amber-700', iconName: 'violin', category: 'music' },
  { letter: 'W', lowercase: 'w', word: 'Whale', phonics: 'wuh', fact: 'Whales are gentle giant sea friends that spray water from their blowhole!', color: 'bg-sky-600', iconName: 'whale', category: 'ocean' },
  { letter: 'X', lowercase: 'x', word: 'Xylophone', phonics: 'zuh', fact: 'Tapping a rainbow xylophone with mallets makes happy musical bells!', color: 'bg-emerald-500', iconName: 'xylophone', category: 'music' },
  { letter: 'Y', lowercase: 'y', word: 'Yacht', phonics: 'yuh', fact: 'A yacht sails gently over sparkling ocean waves in the breeze!', color: 'bg-cyan-600', iconName: 'yacht', category: 'vehicle' },
  { letter: 'Z', lowercase: 'z', word: 'Zebra', phonics: 'zuh', fact: 'Zebras have beautiful black and white stripes like a zebra crossing!', color: 'bg-neutral-800', iconName: 'zebra', category: 'animal' }
];

export const NUMBERS_DATA: NumberData[] = [
  { num: 0, word: 'Zero', item: 'Empty nests', itemEmoji: '🪹', color: 'bg-slate-400' },
  { num: 1, word: 'One', item: 'Sun', itemEmoji: '☀️', color: 'bg-amber-500' },
  { num: 2, word: 'Two', item: 'Apples', itemEmoji: '🍎', color: 'bg-red-500' },
  { num: 3, word: 'Three', item: 'Little kittens', itemEmoji: '🐱', color: 'bg-pink-500' },
  { num: 4, word: 'Four', item: 'Balloons', itemEmoji: '🎈', color: 'bg-sky-500' },
  { num: 5, word: 'Five', item: 'Stars', itemEmoji: '⭐', color: 'bg-yellow-400' },
  { num: 6, word: 'Six', item: 'Flowers', itemEmoji: '🌸', color: 'bg-rose-400' },
  { num: 7, word: 'Seven', item: 'Rainbows', itemEmoji: '🌈', color: 'bg-purple-500' },
  { num: 8, word: 'Eight', item: 'Strawberries', itemEmoji: '🍓', color: 'bg-red-400' },
  { num: 9, word: 'Nine', item: 'Butterflies', itemEmoji: '🦋', color: 'bg-cyan-500' },
  { num: 10, word: 'Ten', item: 'Pencil crayons', itemEmoji: '✏️', color: 'bg-emerald-500' },
  { num: 11, word: 'Eleven', item: 'Shiny bells', itemEmoji: '🔔', color: 'bg-amber-400' },
  { num: 12, word: 'Twelve', item: 'Sweet cupcakes', itemEmoji: '🧁', color: 'bg-pink-400' },
  { num: 13, word: 'Thirteen', item: 'Toy cars', itemEmoji: '🚗', color: 'bg-blue-500' },
  { num: 14, word: 'Fourteen', item: 'Cute duckies', itemEmoji: '🦆', color: 'bg-yellow-500' },
  { num: 15, word: 'Fifteen', item: 'Little fishes', itemEmoji: '🐠', color: 'bg-teal-400' },
  { num: 16, word: 'Sixteen', item: 'Juicy cherries', itemEmoji: '🍒', color: 'bg-red-500' },
  { num: 17, word: 'Seventeen', item: 'Happy frogs', itemEmoji: '🐸', color: 'bg-green-500' },
  { num: 18, word: 'Eighteen', item: 'Fluffy clouds', itemEmoji: '☁️', color: 'bg-sky-400' },
  { num: 19, word: 'Nineteen', item: 'Music notes', itemEmoji: '🎵', color: 'bg-indigo-400' },
  { num: 20, word: 'Twenty', item: 'Golden coins', itemEmoji: '🪙', color: 'bg-amber-500' }
];

export const COLORS_DATA: ColorData[] = [
  { id: 'red', name: 'Red', hex: '#EF4444', textColor: 'text-white', example: 'Red Apple', items: ['🍎 Apple', '🍓 Strawberry', '🚒 Firetruck', '🌹 Rose'] },
  { id: 'blue', name: 'Blue', hex: '#3B82F6', textColor: 'text-white', example: 'Blue Sky', items: ['🌊 Ocean', '👖 Blue Jeans', '🫐 Blueberries', '🐳 Whale'] },
  { id: 'yellow', name: 'Yellow', hex: '#FACC15', textColor: 'text-slate-800', example: 'Sunshine Yellow', items: ['☀️ Sun', '🍌 Banana', '🍋 Lemon', '⭐ Golden Star'] },
  { id: 'green', name: 'Green', hex: '#22C55E', textColor: 'text-white', example: 'Green Leaf', items: ['🍃 Leaf', '🐸 Frog', '🥦 Broccoli', '🐢 Turtle'] },
  { id: 'orange', name: 'Orange', hex: '#F97316', textColor: 'text-white', example: 'Juicy Orange', items: ['🍊 Orange', '🥕 Carrot', '🏀 Basketball', '🦊 Fox'] },
  { id: 'pink', name: 'Pink', hex: '#EC4899', textColor: 'text-white', example: 'Pink Flamingo', items: ['🦩 Flamingo', '🌸 Cherry Blossom', '🍧 Ice Pop', '🎀 Ribbon'] },
  { id: 'purple', name: 'Purple', hex: '#A855F7', textColor: 'text-white', example: 'Purple Grapes', items: ['🍇 Grapes', '🍆 Eggplant', '🔮 Crystal Ball', '🪻 Lavender'] },
  { id: 'brown', name: 'Brown', hex: '#92400E', textColor: 'text-white', example: 'Brown Teddy Bear', items: ['🧸 Teddy Bear', '🪵 Tree Bark', '🌰 Chestnut', '🍪 Cookie'] },
  { id: 'black', name: 'Black', hex: '#1E293B', textColor: 'text-white', example: 'Night Sky', items: ['🌌 Night Sky', '🎩 Top Hat', '🐾 Panther', '🎱 Ball'] },
  { id: 'white', name: 'White', hex: '#F8FAFC', textColor: 'text-slate-800', example: 'White Cloud', items: ['☁️ Fluffy Cloud', '⛄ Snowman', '🥛 Milk', '🕊️ Dove'] },
  { id: 'gray', name: 'Gray', hex: '#64748B', textColor: 'text-white', example: 'Gray Elephant', items: ['🐘 Elephant', '🪨 River Pebble', '🐨 Koala', '🌪️ Breeze'] }
];

export const SHAPES_DATA: ShapeData[] = [
  { id: 'circle', name: 'Circle', sides: 0, realWorldExample: 'A round wall clock or a tasty pizza!', color: 'bg-rose-500', description: 'Curved and round, no corners anywhere!' },
  { id: 'square', name: 'Square', sides: 4, realWorldExample: 'A building block or a picture frame!', color: 'bg-blue-500', description: 'Four equal straight sides and four neat corners!' },
  { id: 'triangle', name: 'Triangle', sides: 3, realWorldExample: 'A crunchy slice of pizza or house roof!', color: 'bg-emerald-500', description: 'Three pointy corners and three straight sides!' },
  { id: 'rectangle', name: 'Rectangle', sides: 4, realWorldExample: 'A tall front door or a school bus!', color: 'bg-amber-500', description: 'Two long sides and two short sides!' },
  { id: 'oval', name: 'Oval', sides: 0, realWorldExample: 'A gentle egg or a swimming water pool!', color: 'bg-cyan-500', description: 'Like a stretched circle, smooth and round!' },
  { id: 'star', name: 'Star', sides: 10, realWorldExample: 'A glowing star in the night sky or wand!', color: 'bg-yellow-400', description: 'Five shiny points reaching out to twinkle!' },
  { id: 'heart', name: 'Heart', sides: 0, realWorldExample: 'A loving hug card or sweet balloon!', color: 'bg-pink-500', description: 'Two curved tops joining at a soft point at the bottom!' },
  { id: 'diamond', name: 'Diamond', sides: 4, realWorldExample: 'A soaring windy kite or a sparkly gem!', color: 'bg-purple-500', description: 'A tipped square that looks ready to take flight!' },
  { id: 'crescent', name: 'Crescent', sides: 2, realWorldExample: 'A sleepy bedtime moon in the evening!', color: 'bg-indigo-500', description: 'A gentle sliver curve like a smiling moon!' }
];

export const ANIMALS_DATA: AnimalData[] = [
  // Farm
  { id: 'cow', name: 'Cow', category: 'farm', sound: 'Moo-moo!', habitat: 'Sunny Green Pasture', food: 'Fresh grass and hay', fact: 'Cows have best friends and love grazing in the meadows!', emoji: '🐮', color: 'bg-emerald-500' },
  { id: 'sheep', name: 'Sheep', category: 'farm', sound: 'Baa-baa!', habitat: 'Rolling Hills', food: 'Sweet clover and grass', fact: 'Sheep have warm, fluffy wool that makes cozy winter sweaters!', emoji: '🐑', color: 'bg-sky-500' },
  { id: 'horse', name: 'Horse', category: 'farm', sound: 'Neigh-neigh!', habitat: 'Barn & Open Fields', food: 'Crunchy apples & oats', fact: 'Horses can run super fast and can even sleep standing up!', emoji: '🐴', color: 'bg-amber-600' },
  { id: 'pig', name: 'Pig', category: 'farm', sound: 'Oink-oink!', habitat: 'Farm Pen', food: 'Vegetables & roots', fact: 'Pigs are super clever and love cooling off in mud baths!', emoji: '🐷', color: 'bg-pink-400' },
  { id: 'chicken', name: 'Chicken', category: 'farm', sound: 'Cluck-cluck!', habitat: 'Cozy Coop', food: 'Grain seeds & corn', fact: 'Hens talk to their chicks even before they hatch from eggs!', emoji: '🐔', color: 'bg-rose-400' },
  { id: 'duck', name: 'Duck', category: 'farm', sound: 'Quack-quack!', habitat: 'Pond & Lake', food: 'Water plants & small seeds', fact: 'Duck feathers have special oil so water slides right off them!', emoji: '🦆', color: 'bg-yellow-500' },
  { id: 'goat', name: 'Goat', category: 'farm', sound: 'Maaa-maaa!', habitat: 'Rocky Farms', food: 'Leaves & twigs', fact: 'Goats are expert climbers and love hopping onto big rocks!', emoji: '🐐', color: 'bg-stone-500' },

  // Safari / Wild
  { id: 'lion', name: 'Lion', category: 'wild', sound: 'Roaaar!', habitat: 'African Savanna', food: 'Wild prey', fact: 'A lion family is called a pride, and daddy lions have big fluffy manes!', emoji: '🦁', color: 'bg-amber-500' },
  { id: 'elephant', name: 'Elephant', category: 'wild', sound: 'Pawoooo!', habitat: 'Forest & Grassland', food: 'Leaves, bark & fruit', fact: 'Elephants are the biggest land animals and use trunks to drink water!', emoji: '🐘', color: 'bg-slate-500' },
  { id: 'giraffe', name: 'Giraffe', category: 'wild', sound: 'Gentle hum!', habitat: 'Savanna plains', food: 'Acacia tree leaves', fact: 'A giraffe has a blue-purple tongue that is almost 2 feet long!', emoji: '🦒', color: 'bg-yellow-600' },
  { id: 'zebra', name: 'Zebra', category: 'wild', sound: 'Barking whinny!', habitat: 'Grasslands', food: 'Tall green grass', fact: 'Every zebra has a unique pattern of stripes, like a fingerprint!', emoji: '🦓', color: 'bg-neutral-700' },
  { id: 'tiger', name: 'Tiger', category: 'wild', sound: 'Grrrr-roar!', habitat: 'Deep Rainforest', food: 'Wild prey', fact: 'Tigers are excellent swimmers and love playing in cool jungle pools!', emoji: '🐯', color: 'bg-orange-500' },
  { id: 'monkey', name: 'Monkey', category: 'wild', sound: 'Ooh-ooh-aah-aah!', habitat: 'High Treetops', food: 'Bananas, fruit & nuts', fact: 'Monkeys use their strong tails to hang upside down from trees!', emoji: '🐵', color: 'bg-amber-700' },
  { id: 'bear', name: 'Bear', category: 'wild', sound: 'Grrr-growl!', habitat: 'Pine Forest & Caves', food: 'Berries, honey & fish', fact: 'Bears take a long, cozy winter nap called hibernation!', emoji: '🐻', color: 'bg-yellow-900' },

  // Pets
  { id: 'dog', name: 'Puppy Dog', category: 'pets', sound: 'Woof-woof!', habitat: 'Warm Loving Home', food: 'Dog biscuits & treats', fact: 'Dogs have an amazing sense of smell and love cuddles and walks!', emoji: '🐶', color: 'bg-orange-400' },
  { id: 'cat', name: 'Kitten Cat', category: 'pets', sound: 'Purr-meow!', habitat: 'Cozy Living Room', food: 'Fish & crunchy kibble', fact: 'When cats are happy and content, their tummy purrs like a soft engine!', emoji: '🐱', color: 'bg-amber-400' },
  { id: 'rabbit', name: 'Bunny Rabbit', category: 'pets', sound: 'Thump-thump!', habitat: 'Green Garden Hutch', food: 'Crisp carrots & fresh greens', fact: 'Rabbits wiggle their cute little noses to smell everything around them!', emoji: '🐰', color: 'bg-pink-300' },
  { id: 'parrot', name: 'Parrot', category: 'pets', sound: 'Squawk-hello!', habitat: 'Sunny Perch', food: 'Seeds, apples & nuts', fact: 'Parrots have bright rainbow feathers and can copy words you say!', emoji: '🦜', color: 'bg-emerald-600' },
  { id: 'hamster', name: 'Little Hamster', category: 'pets', sound: 'Squeak-squeak!', habitat: 'Cage with running wheel', food: 'Sunflower seeds & grains', fact: 'Hamsters have cheek pouches to carry snacks back to their beds!', emoji: '🐹', color: 'bg-amber-500' },

  // Birds
  { id: 'owl', name: 'Wise Owl', category: 'birds', sound: 'Hoo-hoo!', habitat: 'Quiet Night Woods', food: 'Field mice & insects', fact: 'Owls can turn their heads almost all the way around to look behind!', emoji: '🦉', color: 'bg-indigo-600' },
  { id: 'penguin', name: 'Penguin', category: 'birds', sound: 'Honk-honk!', habitat: 'Icy Antarctica', food: 'Silvery fish & krill', fact: 'Penguins cannot fly in the air, but they fly underwater like torpedos!', emoji: '🐧', color: 'bg-sky-700' },
  { id: 'peacock', name: 'Peacock', category: 'birds', sound: 'May-awe!', habitat: 'Palace Gardens', food: 'Seeds & berries', fact: 'Peacocks fan out spectacular giant tail feathers filled with shiny eyespots!', emoji: '🦚', color: 'bg-teal-600' },
  { id: 'flamingo', name: 'Pink Flamingo', category: 'birds', sound: 'Gaggle-honk!', habitat: 'Warm Tropical Lagoons', food: 'Tiny pink shrimp & algae', fact: 'Flamingos often balance peacefully on just one slender leg!', emoji: '🦩', color: 'bg-pink-500' },
  { id: 'toucan', name: 'Toucan', category: 'birds', sound: 'Croak-rattle!', habitat: 'Amazon Canopy', food: 'Wild tropical berries', fact: 'Toucans have giant colorful beaks that are lightweight like foam!', emoji: '🪶', color: 'bg-orange-600' },

  // Ocean
  { id: 'dolphin', name: 'Dolphin', category: 'ocean', sound: 'Click-whistle!', habitat: 'Warm Sparkling Ocean', food: 'Fish & squid', fact: 'Dolphins leap high into the air and love surfing ocean waves!', emoji: '🐬', color: 'bg-cyan-500' },
  { id: 'whale', name: 'Blue Whale', category: 'ocean', sound: 'Deep ocean song!', habitat: 'Deep Blue Sea', food: 'Tiny ocean krill', fact: 'Whales are the biggest creatures to ever live on planet Earth!', emoji: '🐳', color: 'bg-blue-600' },
  { id: 'turtle', name: 'Sea Turtle', category: 'ocean', sound: 'Gentle splash!', habitat: 'Coral Reefs', food: 'Seaweed & jellyfish', fact: 'Sea turtles have been swimming in oceans since the time of dinosaurs!', emoji: '🐢', color: 'bg-emerald-500' },
  { id: 'octopus', name: 'Octopus', category: 'ocean', sound: 'Bubble-pop!', habitat: 'Reef Caverns', food: 'Crabs & clams', fact: 'An octopus has eight wiggly arms, three hearts, and blue blood!', emoji: '🐙', color: 'bg-purple-500' },
  { id: 'clownfish', name: 'Clownfish', category: 'ocean', sound: 'Chirp-chirp!', habitat: 'Sea Anemone Home', food: 'Tiny ocean plankton', fact: 'Clownfish have bright orange and white stripes and shelter in soft anemones!', emoji: '🐠', color: 'bg-orange-500' }
];

export const RHYMES_DATA: RhymeData[] = [
  {
    id: 'rhyme_alphabet',
    title: 'The Wonder Alphabet Train',
    theme: '🔤 Learn Letters A to Z',
    duration: '1:00',
    lyrics: [
      'Choo-choo comes the letter train,',
      'Singing through the sun and rain!',
      'A B C D E F G,',
      'Won\'t you come and ride with me?',
      'H I J K L M N O P,',
      'Happy letters by the sea!',
      'Q R S and T U V,',
      'W X Y and Z!',
      'Now I know my A B Cs,',
      'Next time won\'t you sing with me!'
    ],
    notes: [261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00, 349.23, 349.23, 329.63, 329.63, 293.66, 293.66, 261.63]
  },
  {
    id: 'rhyme_counting',
    title: 'Five Little Froggies',
    theme: '🔢 Learn to Count 1 to 5',
    duration: '0:50',
    lyrics: [
      'Five little speckled frogs,',
      'Sitting on a speckled log,',
      'Eating some most delicious bugs, yum yum!',
      'One jumped into the pool,',
      'Where it was nice and cool,',
      'Now there are four green speckled frogs, ribbit ribbit!',
      'Four, three, two, and one,',
      'Splashing in the golden sun!'
    ],
    notes: [329.63, 329.63, 329.63, 392.00, 329.63, 293.66, 261.63, 293.66, 329.63, 392.00]
  },
  {
    id: 'rhyme_rainbow',
    title: 'The Rainbow Colors Song',
    theme: '🌈 Rainbow Color Magic',
    duration: '0:45',
    lyrics: [
      'Red is an apple, shiny and bright,',
      'Blue is the ocean, a lovely sight!',
      'Yellow is sunshine up so high,',
      'Green is the grass beneath the sky!',
      'Orange is a carrot, purple a flower,',
      'Rainbow colors bring magic power!'
    ],
    notes: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]
  },
  {
    id: 'rhyme_animals',
    title: 'Animals in the Wonder Barn',
    theme: '🐮 Animal Sounds & Fun',
    duration: '0:55',
    lyrics: [
      'Down in the valley on Wonder Farm,',
      'All the animals safe and warm!',
      'Cow says moo, sheep says baa,',
      'Happiest barn that you ever saw!',
      'Little duck quacks, puppy barks with glee,',
      'Dancing together so happily!'
    ],
    notes: [261.63, 329.63, 392.00, 329.63, 261.63, 392.00, 349.23, 329.63, 293.66, 261.63]
  },
  {
    id: 'rhyme_twinkle',
    title: 'Twinkle Wonder Star',
    theme: '⭐ Calm Bedtime & Starlight',
    duration: '0:50',
    lyrics: [
      'Twinkle, twinkle, little star,',
      'How I wonder what you are!',
      'Up above the world so high,',
      'Like a diamond in the sky!',
      'Twinkle, twinkle, little star,',
      'Watching over near and far!'
    ],
    notes: [261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00, 349.23, 349.23, 329.63, 329.63, 293.66, 293.66, 261.63]
  }
];

export const BADGES_CATALOG = [
  { id: 'first_explorer', title: 'First Explorer', desc: 'Welcome to WonderKids World!', icon: '🌟', starsNeeded: 0 },
  { id: 'abc_cadet', title: 'ABC Cadet', desc: 'Explored 10 different letters!', icon: '🔤', starsNeeded: 10 },
  { id: 'number_ninja', title: 'Number Hero', desc: 'Counted past 10 objects!', icon: '🔢', starsNeeded: 20 },
  { id: 'color_wizard', title: 'Color Wizard', desc: 'Found all rainbow colors!', icon: '🎨', starsNeeded: 35 },
  { id: 'shape_builder', title: 'Shape Architect', desc: 'Built a house or rocket with shapes!', icon: '📐', starsNeeded: 50 },
  { id: 'safari_ranger', title: 'Safari Ranger', desc: 'Discovered 15 wild and farm animals!', icon: '🦁', starsNeeded: 75 },
  { id: 'creative_picasso', title: 'Little Master Artist', desc: 'Created 3 original drawings!', icon: '🖌️', starsNeeded: 100 },
  { id: 'wonder_superstar', title: 'Wonder Superstar', desc: 'Earned 150 magical stars!', icon: '👑', starsNeeded: 150 }
];
