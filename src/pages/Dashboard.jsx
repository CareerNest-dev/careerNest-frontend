import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, getUserId, getAuthToken } from '../utils/auth';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [scheduledSessions, setScheduledSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchMeetings = async () => {
      try {
        const userId = getUserId();
        const token = getAuthToken();
        
        const response = await axios.get(
          'http://carrernest-nodejs-alb-1673428613.ap-south-1.elb.amazonaws.com/api/mentor/meeting/fetchtmeeting',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data && Array.isArray(response.data)) {
          setScheduledSessions(response.data);
        } else {
          setScheduledSessions([]);
        }
      } catch (err) {
        console.error('Error fetching meetings:', err);
        setError('Failed to load scheduled meetings');
        setScheduledSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [navigate]);

  const suggestedInternships = [
    {
      id: 1,
      title: "Front End Developer (Intern)",
      description: "Our platform connects ambitious internship seekers with trusted companies and experienced mentors, empowering the next generation to gain valuable experience and career guidance.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      location: "10/100 Central Road, 10",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Front End Developer (Intern)",
      description: "Our platform connects ambitious internship seekers with trusted companies and experienced mentors, empowering the next generation to gain valuable experience and career guidance.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      location: "10/100 Central Road, 10",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Front End Developer (Intern)",
      description: "Our platform connects ambitious internship seekers with trusted companies and experienced mentors, empowering the next generation to gain valuable experience and career guidance.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      location: "10/100 Central Road, 10",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=200&fit=crop"
    }
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome,
        </h1>
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-gray-900">Asanka Samarasinha</span>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Student
          </span>
        </div>
      </div>

      {/* Scheduled Sessions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Scheduled Sessions</h2>
          <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
            // Loading state
            <div className="col-span-3 text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading scheduled meetings...</p>
            </div>
          ) : error ? (
            // Error state
            <div className="col-span-3 text-center py-8 text-red-600">
              <p>{error}</p>
            </div>
          ) : scheduledSessions.length === 0 ? (
            // Empty state
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6 h-48 flex items-center justify-center border-2 border-dashed border-blue-600">
                <div className="text-center text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">No sessions scheduled</p>
                </div>
              </div>
            </div>
          ) : (
            // Display meetings
            scheduledSessions.map((session) => (
              <div key={session._id || session.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {session.title || 'Mentoring Session'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(session.dateTime || session.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      Time: {new Date(session.dateTime || session.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Status: <span className="font-medium text-blue-600">{session.status || 'Scheduled'}</span>
                      </span>
                      {session.meetingLink && (
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Join Meeting →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Suggest for you */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Suggest for you</h2>
          <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {suggestedInternships.map((internship) => (
            <div key={internship.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 bg-gray-200 mb-4 rounded-md overflow-hidden">
                <img 
                  src={internship.image} 
                  alt={internship.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{internship.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {internship.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {internship.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {internship.location}
                </span>
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                  Apply Now
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;