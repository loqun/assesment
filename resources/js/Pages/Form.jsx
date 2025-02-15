import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ListTodo,
  DollarSign,
  Tag,
  Calendar,
  Accessibility,
  Plus,
  Trash2,
  CheckCircle2
} from "lucide-react";

// Activity item component optimized with React.memo
const ActivityItem = React.memo(({ activity, onDelete }) => {
  return (
    <div
      className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50"
    >
      <div className="space-y-1">
        <h3 className="font-medium flex items-center gap-2">
          <CheckCircle2 size={18} className="text-green-500" />
          {activity.activity}
        </h3>
        <div className="text-sm text-gray-500 space-y-1">
          <p className="flex items-center gap-2">
            <Tag size={16} /> Type: {activity.type}
          </p>
          <p className="flex items-center gap-2">
            <DollarSign size={16} /> Price: ${activity.price}
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={16} /> Booking: {activity.bookingRequired ? "Required" : "Not Required"}
          </p>
          <p className="flex items-center gap-2">
            <Accessibility size={16} /> Accessibility: {activity.accessibility.toFixed(1)}
          </p>
        </div>
      </div>
      <button onClick={() => onDelete(activity.id)} className="text-red-500 hover:text-red-700 p-2">
        <Trash2 size={20} />
      </button>
    </div>
  );
});

const ActivityForm = () => {
  const [formData, setFormData] = useState({
    activity: "",
    price: "",
    type: "",
    bookingRequired: false,
    accessibility: 0.5,
  });

  // Memoized activity types to prevent unnecessary re-renders
  const activityTypes = useMemo(
    () => ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"],
    []
  );

  // Load activities from localStorage only once
  const [activities, setActivities] = useState(() => {
    const storedActivities = localStorage.getItem("activities");
    return storedActivities ? JSON.parse(storedActivities) : [];
  });

  // Effect to update localStorage only when activities change
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  // Memoized handleSubmit to prevent unnecessary re-renders
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setActivities((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormData({
      activity: "",
      price: "",
      type: "",
      bookingRequired: false,
      accessibility: 0.5,
    });
  }, [formData]);

  // Memoized handleDelete function
  const handleDelete = useCallback((id) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ListTodo className="text-blue-500" />
            New Activity
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Activity Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 size={18} className="text-gray-500" />
                  Activity
                </div>
                <input
                  type="text"
                  value={formData.activity}
                  onChange={(e) => setFormData((prev) => ({ ...prev, activity: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  placeholder="Enter activity name"
                  required
                />
              </label>
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={18} className="text-gray-500" />
                  Price
                </div>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  placeholder="Enter price"
                  required
                />
              </label>
            </div>

            {/* Type Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">
                <div className="flex items-center gap-2 mb-1">
                  <Tag size={18} className="text-gray-500" />
                  Type
                </div>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select activity type</option>
                  {activityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Booking Required Checkbox */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={formData.bookingRequired}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bookingRequired: e.target.checked }))}
                  className="w-4 h-4"
                />
                <span>Booking required</span>
              </label>
            </div>

            {/* Accessibility Slider */}
            <div>
              <label className="block text-sm font-medium mb-1">
                <div className="flex items-center gap-2 mb-1">
                  <Accessibility size={18} className="text-gray-500" />
                  Accessibility ({formData.accessibility.toFixed(1)})
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={formData.accessibility}
                  onChange={(e) => setFormData((prev) => ({ ...prev, accessibility: parseFloat(e.target.value) }))}
                  className="w-full mt-1"
                />
              </label>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
              <Plus size={18} />
              Add Activity
            </button>
          </form>
        </div>

        {/* Activities List */}
        {activities.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ListTodo className="text-blue-500" />
              Activities List
            </h2>
            <div className="space-y-4">
              {activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityForm;
