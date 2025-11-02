export default function HomeHero() {
  return (
    <section className="bg-[#fafbff] min-h-screen flex items-center justify-center px-6 md:px-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Plan, Share, and Enjoy <br />
            Your Events, Our Space!
          </h1>

          <p className="text-lg text-gray-700 mt-6">
            Book and learn helpful tips from{" "}
            <span className="font-semibold">3,172+</span> mentors in world-class
            companies with our global community.
          </p>

          <button className="mt-8 bg-green-600 hover:bg-green-700 cursor-pointer text-white px-8 py-3 rounded-full font-medium shadow-lg transition">
            Explore Now
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          <img
            src="https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGNvZGVyJTIwZXZlbnRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
            alt="happy"
            className="rounded-full w-60 h-60 object-cover shadow-md"
          />
          <img
            src="https://media.istockphoto.com/id/1482843873/photo/close-up-on-hands-of-a-crowd-of-people-clapping-in-dark-conference-hall-during-a-motivational.webp?a=1&b=1&s=612x612&w=0&k=20&c=zNxI84RBn9xNmLZsBlKB-eaZtUphfUZfEzn-6mcowj0="
            alt="happy"
            className="rounded-full w-60 h-60 object-cover shadow-md"
          />
          <img
            src="https://images.unsplash.com/photo-1559146820-a75deba24b58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNvZGVyJTIwZXZlbnRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
            alt="happy"
            className="rounded-full w-60 h-60 object-cover shadow-md"
          />
          <img
            src="https://media.istockphoto.com/id/2215674535/photo/young-asian-software-development-manager-leads-a-late-night-office-discussion-with-his.webp?a=1&b=1&s=612x612&w=0&k=20&c=9EzjAlCR7-xJG3mrH0kZRQuvCz08nBXfkYHHHgFjHNc="
            alt="happy"
            className="rounded-full w-60 h-60 object-cover shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
