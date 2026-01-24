const Bookings = () => {
  return (
    <div>
      <h2 className="text-2xl font-playfair font-semibold text-pink-800 mb-6">
        Bookings
      </h2>

      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-pink-50">
            <tr>
              <th className="p-4">Couple</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <BookingRow couple="Emily & John" date="18 Jun 2026" status="Confirmed" />
            <BookingRow couple="Priya & Rohit" date="1 Jul 2026" status="Pending" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BookingRow = ({ couple, date, status }) => (
  <tr className="border-t">
    <td className="p-4 font-medium">{couple}</td>
    <td className="p-4">{date}</td>
    <td className="p-4">
      <span
        className={`px-3 py-1 rounded-full text-sm ${
          status === "Confirmed"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {status}
      </span>
    </td>
  </tr>
);

export default Bookings;
