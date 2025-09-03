const UserInputTextBox = ({
    userInput, setUserInput, feedback
}: {
    userInput: string;
    setUserInput: (value: string) => void;
    feedback: string;
}) => {
    return (
        <div className="space-y-4">
          {feedback && (
            <div className="text-red-500 text-sm font-semibold text-center animate-bounce">
              {feedback}
            </div>
          )}
          <textarea
            id="userInput"
            rows={4}
            placeholder="e.g., A quick weeknight dinner recipe or a list of ingredients for a hearty stew."
            className="w-full p-4 text-white placeholder-gray-300 bg-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-sm"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>
    )
}

export default UserInputTextBox