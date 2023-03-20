import img from "../img/fibonacci.png";

export default function OtherPage() {
  return (
    <div style={{ width: "400px" }} className="mx-auto">
      <h3>What is the Fibonacci sequence?</h3>
      <p>
        The Fibonacci sequence is a set of integers (the Fibonacci numbers) that
        starts with a zero, followed by a one, then by another one, and then by
        a series of steadily increasing numbers. The sequence follows the rule
        that each number is equal to the sum of the preceding two numbers.
      </p>
      <p>The Fibonacci sequence begins with the following 14 integers:</p>
      <p>0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233 ...</p>
      <p>
        Each number, starting with the third, adheres to the prescribed formula.
        For example, the seventh number, 8, is preceded by 3 and 5, which add up
        to 8.
      </p>
      <img src={img} alt="fibonacci_image" style={{ width: "400px" }} />
    </div>
  );
}
