const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Song = require("./models/Song");

dotenv.config();

const sampleSongs = [
  {
    title: "Comethru",
    artist: "Jeremy Zucker",
    audioUrl: "/assets/music/comethru.mp3",
    coverImage: "/assets/covers/comethru.jpg",
    lyrics: `I might lose my mind
Waking when the sun's down
Riding all these highs
Waiting for the comedown
Walk these streets with me
I'm doing decently
Just glad that I can breathe, yeah

I'm trying to realise
It's alright to not be fine on your own

Now I'm shaking, drinking all this coffee
These last few weeks have been exhausting
I'm lost in my imagination
And there's one thing that I need from you
Can you come through, through?`,
  },
  {
    title: "Dooron Dooron",
    artist: "Paresh Pahuja",
    audioUrl: "/assets/music/dooron.mp3",
    coverImage: "/assets/covers/dooron.jpg",
    lyrics: `Dooron dooron main
vekhaa tenu soneyo…
Kahaan tuuu
Kahaan main…
Dooron dooron main vekhaan tenu,
soneyo…
Kahaan tuuu
Kahaan
main…`,
  },
  {
    title: "Yellow",
    artist: "Coldplay",
    audioUrl: "/assets/music/yellow.mp3",
    coverImage: "/assets/covers/yellow.jpg",
    lyrics: `Look at the stars
Look how they shine for you
And everything you do
Yeah, they were all yellow
I came along
I wrote a song for you
And all the things you do
And it was called, Yellow`,
  },
  {
    title: "Lag ja gale",
    artist: "Lata Mangeshkar",
    audioUrl: "/assets/music/lagjagale.mp3",
    coverImage: "/assets/covers/lagjagale.jpg",
    lyrics: `Lag Ja Gale Ki Phir
ye Hasin Raat Ho Na Ho
shayad Phir Is Janam Mein
mulakat Ho Na Ho
lag Jaa Gale 

ke phir ye hansi raat ho na ho
shayad phir is janam Mein mulakat ho na ho...
lag ja gale 

hum Ko Mili Hai Aaj
ye Ghadiya Naseeb Se
je Bhar Ke Dekh Leejiye
hamako Kareeb Se
phir Apke Naseeb Mein
ye Baat Ho Na Ho

shayad phir Is Janaam Mein
mulakaat Ho Na Ho
pas Aiye Ki Ham Nahin`,
  },
  {
    title: "Run it up",
    artist: "HanumanKind",
    audioUrl: "/assets/music/runitup.mp3",
    coverImage: "/assets/covers/runitup.jpg",
    lyrics: `Run it up, the sun is up
To when it's down, get your money up
I put money down on all of us
On my people no, on what I love

Ooh, baby, it's dangerous
Your problems, they just not the same to us
We're dealin' with things you ain't seen before
We're feelin' the weight of our ancestors
We're healin' with ways that don't last for long
Don't have us the time, ain't it obvious?
No help for the weak, but the liquor strong
Plenty here, pour it for all of us`,
  },
  {
    title: "Tum tak",
    artist: "Javed Ali",
    audioUrl: "/assets/music/tumtak.mp3",
    coverImage: "/assets/covers/tumtak.jpg",
    lyrics: `ओ मेरी हर मनमानी बस तुम तक
बातें बचकानी बस तुम तक
मेरी नज़र दीवानी बस तुम तक
मेरे सुख दु:ख आते जाते सारे

तुम तक तुम तक तुम तक सोनिया
तुम तक तुम तक तुम तक सोनिया

तुम तक तुम तक अर्ज़ी मेरी
फिर आगे जो मर्ज़ी
तुम तक तुम तक अर्ज़ी मेरी
फिर तेरी जो मर्ज़ी मेरी

हर दुश्वारी बस तुम तक
मेरी हर होशियारी बस तुम तक
मेरी हर तैयारी बस तुम तक

तुम तक तुम तक तुम तक तुम तक
मेरी इश्क़ खुमारी बस तुम तक`,
  },
];

const seedSongs = async () => {
  try {
    await connectDB();
    await Song.deleteMany();
    await Song.insertMany(sampleSongs);
    console.log("Seed data inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedSongs();
