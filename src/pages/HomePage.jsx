import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "antd";

export default function HomePage() {
  return (
    <div className="homepage py-4">
      <h1 className="bg-[url('assets/quiz.jpeg')] text-yellow-500 hover:text-white bg-right-top p-32 rounded-lg font-extrabold text-4xl my-8">
        Welcome to Quizzical: Your Ultimate Quiz Challenge!
      </h1>
      <h2 className="text-lg sm:text-3xl font-bold my-2">
        Ready to Test Your Knowledge?
      </h2>
      <h3 className="font-semibold my-2">
        Quizzical is your go-to destination for fun, challenging, and
        educational quizzes that cover a wide range of topics. Whether you're a
        trivia enthusiast, a history buff, a science nerd, or just looking for a
        fun way to pass the time, we've got quizzes that will keep you
        entertained and engaged.
      </h3>
      <h2 className="text-lg sm:text-3xl font-bold my-2">
        Why Choose Quizzical?
      </h2>
      <Carousel autoplay>
        <div>
          <h3 className="bg-[url('assets/Diverse.jpeg')]  bg-top text-right text-2xl sm:text-4xl font-extrabold text-gray-800 p-16 sm:p-24 ">
            Diverse Quiz Categories: Explore a variety of quiz categories, from
            general knowledge and pop culture to sports, history, and more. We
            have something for everyone!
          </h3>
        </div>
        <div>
          <h3 className=" bg-[url('assets/Challange.jpeg')]  bg-top text-right text-2xl sm:text-4xl font-extrabold text-black  p-16 sm:p-24">
            Challenge Yourself: Test your knowledge and challenge yourself with
            quizzes of varying difficulty levels. Are you a beginner or an
            expert? Find quizzes that match your skill level.
          </h3>
        </div>
        <div>
          <h3 className=" bg-[url('assets/Compete.jpeg')]  bg-top text-right text-2xl sm:text-4xl font-extrabold text-black  p-16 sm:p-24">
            Compete with Friends: Invite your friends to join you in friendly
            competition. See who can score the highest on quizzes and claim
            bragging rights.
          </h3>
        </div>
        <div>
          <h3 className=" bg-[url('assets/Learn.jpeg')]  bg-top text-right text-2xl sm:text-4xl font-extrabold text-black  p-16 sm:p-24">
            Learn While Having Fun: Quizzical isn't just about fun; it's also an
            opportunity to learn new facts, trivia, and interesting information.
          </h3>
        </div>
        <div>
          <h3 className=" bg-[url('assets/userFriendly.jpeg')]  bg-cover text-right text-2xl sm:text-4xl font-extrabold text-black  p-16 sm:p-24">
            User-Friendly Interface: Our user-friendly interface makes it easy
            to browse and select quizzes. You can start answering questions in
            seconds.
          </h3>
        </div>
      </Carousel>

      <h2 className="text-lg sm:text-3xl font-bold my-4 sm:my-2">
        Get Started Today!
      </h2>
      <h3 className="font-semibold my-2">
        Ready to embark on your quiz journey? It's easy to get started:
      </h3>
      <ol className="font-semibold my-2 ">
        <li>
          <span className="font-extrabold">Browse Our Quizzes:</span> Explore
          our extensive library of quizzes and pick the topics that interest you
          the most.
        </li>
        <li>
          <span className="font-extrabold">Answer Questions: D</span>ive into
          the world of quizzes by answering questions, making choices, and
          seeing how well you do.
        </li>
        <li>
          <span className="font-extrabold">Create an Account: </span>Sign up for
          a free Quizzical account to keep track of your progress, compete with
          friends, and unlock special features.
        </li>
        <li>
          <span className="font-extrabold">Share Your Results:</span> Share your
          quiz results with friends on social media and challenge them to beat
          your score.
        </li>
      </ol>
      <h2 className="text-lg sm:text-3xl font-bold my-4 sm:my-2">
        Join Our Quizzical Community
      </h2>
      <h3 className="font-semibold my-2">
        Quizzical isn't just a quiz platform; it's a community of knowledge
        seekers and quiz enthusiasts. Connect with fellow users, share your
        favorite quizzes, and discover new ones together.
      </h3>
      <h2 className="text-lg sm:text-3xl font-bold my-4 sm:my-2">
        Stay Tuned for Updates
      </h2>
      <h3 className="font-semibold my-2">
        We're constantly adding new quizzes and features to enhance your
        Quizzical experience. Be sure to follow us on social media and subscribe
        to our newsletter to stay updated.
        <br />
        <br />
        Ready to put your knowledge to the test? Let's get quizzical!
      </h3>
      <Link to="quiz" className="Explore-Button">
        <button className="flex mx-auto mt-16 mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-300 gap-5 rounded-lg">
          Explore Quizzes
        </button>
      </Link>
    </div>
  );
}
