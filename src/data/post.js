const forumData = {
  users: [
    { id: 1, username: "kopifan88", avatar: "👤" },
    { id: 2, username: "barista_joe", avatar: "☕" },
    { id: 3, username: "technerd", avatar: "💻" },
    { id: 4, username: "latte_lady", avatar: "👩‍🍳" },
    { id: 5, username: "admin_mocha", avatar: "🛠️" },
  ],

  communities: [
    {
      id: "coffee-lovers",
      name: "Coffee Lovers",
      description: "Talk beans, brews, and barista tips!",
      posts: [
        {
          id: "post1",
          title: "Best espresso machines under $500?",
          content:
            "Looking for a solid entry-level espresso machine. Any tips?",
          authorId: 2,
          createdAt: "2025-10-19T08:30:00Z",
          comments: [
            {
              id: "c1",
              authorId: 1,
              content: "Breville Bambino Plus is great!",
              createdAt: "2025-10-19T09:00:00Z",
            },
            {
              id: "c2",
              authorId: 4,
              content: "Check out Gaggia Classic Pro 👌",
              createdAt: "2025-10-19T09:15:00Z",
            },
          ],
        },
        {
          id: "post2",
          title: "Cold brew recipe?",
          content: "Trying to make smooth cold brew at home. Share yours!",
          authorId: 1,
          createdAt: "2025-10-20T11:00:00Z",
          comments: [],
        },
      ],
    },

    {
      id: "tech-talk",
      name: "Tech Talk",
      description: "Coding, gadgets, AI, and software rants.",
      posts: [
        {
          id: "post3",
          title: "SvelteKit vs Next.js?",
          content: "Anyone switched to SvelteKit recently?",
          authorId: 3,
          createdAt: "2025-10-18T14:45:00Z",
          comments: [
            {
              id: "c3",
              authorId: 2,
              content: "SvelteKit is smooth but lacks some ecosystem tools.",
              createdAt: "2025-10-18T15:00:00Z",
            },
          ],
        },
        {
          id: "post4",
          title: "How do you stay productive?",
          content: "I’m constantly distracted while coding. Tips?",
          authorId: 5,
          createdAt: "2025-10-17T10:20:00Z",
          comments: [
            {
              id: "c4",
              authorId: 4,
              content: "Pomodoro method helps me stay focused.",
              createdAt: "2025-10-17T11:00:00Z",
            },
            {
              id: "c5",
              authorId: 1,
              content: "Noise-canceling headphones + lo-fi!",
              createdAt: "2025-10-17T11:30:00Z",
            },
          ],
        },
      ],
    },

    {
      id: "books-and-brews",
      name: "Books & Brews",
      description: "Books to sip coffee with ☕📚",
      posts: [
        {
          id: "post5",
          title: "What are you reading this October?",
          content: "I just started 'Kafka on the Shore'. What about you?",
          authorId: 4,
          createdAt: "2025-10-15T13:00:00Z",
          comments: [
            {
              id: "c6",
              authorId: 3,
              content: "Reading Dune — again! 🔥",
              createdAt: "2025-10-15T14:00:00Z",
            },
            {
              id: "c7",
              authorId: 1,
              content: "Atomic Habits. Simple but powerful.",
              createdAt: "2025-10-15T14:30:00Z",
            },
          ],
        },
      ],
    },

    {
      id: "off-topic",
      name: "Off Topic",
      description: "Random thoughts, memes, and general fun.",
      posts: [
        {
          id: "post6",
          title: "Show your pets!",
          content: "Cats, dogs, parrots — post them all 🐾",
          authorId: 1,
          createdAt: "2025-10-14T18:00:00Z",
          comments: [
            {
              id: "c8",
              authorId: 2,
              content: "My golden retriever loves coffee foam 😂",
              createdAt: "2025-10-14T18:30:00Z",
            },
            {
              id: "c9",
              authorId: 5,
              content: "Got a parrot that says 'latte' 😅",
              createdAt: "2025-10-14T19:00:00Z",
            },
          ],
        },
        {
          id: "post7",
          title: "Favorite emoji?",
          content: "Mine: 🐸☕ What's yours?",
          authorId: 3,
          createdAt: "2025-10-14T20:00:00Z",
          comments: [],
        },
      ],
    },
  ],
};

export default forumData;
