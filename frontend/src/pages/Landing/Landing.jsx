import { Button, Card } from "../../components/index";
import { Users, Wallet, CalendarDays, CheckSquare } from "lucide-react";
import {Link} from "react-router-dom"

const Landing = () => {
  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-white text-gray-800">

      {/* HERO SECTION */}
      <section className="relative px-6 py-28 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-pink-900 leading-tight">
            Plan Your Perfect Wedding,
            <br />
            <span className="text-pink-600">
              All in One Place
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-lg leading-relaxed">
            Seamlessly manage guests, vendors, budgets, and schedules —
            all designed to make your special day stress-free.
          </p>

          <div className="mt-10 flex gap-5">
            <Link to="/auth-page">
              <Button>
                Get Started
              </Button>
            </Link>
            <Link to="/login">

              <Button variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="hidden md:block relative m-auto">
          <img
            src="/images/landing-hero.png"
            alt="Wedding Couple"
            className="rounded-3xl shadow-xl"
          />
          {/* Decorative Glow */}
          <div className="absolute -bottom-6 -left-6 w-full h-full bg-pink-200/30 rounded-3xl blur-2xl -z-10"></div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 py-24 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-pink-800">
          All-in-One Wedding Planning App
        </h2>

        <p className="mt-5 mb-14 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Everything you need to plan your dream wedding — beautifully
          organized in one elegant platform.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <Card
            icon={<Users size={22} />}
            title="Guest List & RSVPs"
            description="Effortlessly manage guests and track confirmations"
          />
          <Card
            icon={<Wallet size={22} />}
            title="Budget Planner"
            description="Plan expenses and stay within budget with ease"
          />
          <Card
            icon={<CalendarDays size={22} />}
            title="Wedding Timeline"
            description="Never miss an important milestone or date"
          />
          <Card
            icon={<CheckSquare size={22} />}
            title="Vendor Booking"
            description="Discover, compare, and book trusted vendors"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-24 bg-white/70 backdrop-blur-md">
        <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-pink-800 text-center mb-16">
          How It Works
        </h2>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 text-center relative">
            {[
              {
                title: "Create Your Account",
                desc: "Sign up and get started in just a few minutes",
              },
              {
                title: "Add Wedding Details",
                desc: "Enter dates, venue, and preferences",
              },
              {
                title: "Invite Guests & Book Vendors",
                desc: "Send invites and manage bookings seamlessly",
              },
              {
                title: "Track Everything",
                desc: "Monitor progress from one elegant dashboard",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Step Number */}
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>

                <h3 className="text-lg font-playfair font-semibold text-pink-700">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {step.desc}
                </p>

                {/* Connector */}
                {index !== 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-10 w-10 h-[2px] bg-pink-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28 text-center bg-gradient-to-br from-pink-100 to-rose-100">
        <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-pink-900">
          Ready to Plan Your Dream Wedding?
        </h2>

        <p className="mt-5 text-gray-700 mb-10 max-w-xl mx-auto leading-relaxed">
          Start your journey today and enjoy a beautifully organized,
          stress-free wedding planning experience.
        </p>

        <Link to="/auth-page">
          <Button>
            Start for Free
          </Button>
        </Link>
      </section>

    </div>
  );
};

export default Landing;
