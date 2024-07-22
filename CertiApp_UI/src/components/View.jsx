import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams();
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await fetch(`http://localhost:5000/certificate/${id}`);
        if (!res.ok) {
          throw new Error('Certificate not found');
        }
        const data = await res.json();
        setCertificateData(data);
      } catch (error) {
        console.error('Error fetching certificate:', error);
        setError(error.message);
      }
    };

    fetchCertificate();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!certificateData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-12 p-6">
      <div className="relative border-8 border-double border-gray-300">
        <div className="absolute inset-0 border-4 border-double border-gray-500 m-2"></div>
        <div className="relative p-12 bg-white shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold">Kerala Blockchain Academy</h2>
          </div>
          <div className="text-center mb-8">
            <span className="text-2xl block mb-4">
              Name: <span id="name" className="font-bold">{certificateData.name}</span>
            </span>
            <span className="block text-xl italic">has earned</span>
            <span className="text-2xl block mt-2">
              Grade: <span id="grade" className="font-bold">{certificateData.grade}</span>
            </span>
          </div>
          <div className="text-center mb-8">
            <span className="block text-xl italic">while completing the training course entitled</span>
            <span className="text-2xl block mt-2 underline">
              Course: <span id="course" className="font-bold">{certificateData.course}</span>
            </span>
          </div>
          <div className="flex justify-between mb-8">
            <div className="text-xl">
              <span>
                Certificate ID: <span id="ID" className="font-bold">{certificateData.certiid}</span>
              </span>
            </div>
            <div className="text-xl text-right">
              <span>
                Date of Completion: <span id="date" className="font-bold">{certificateData.date}</span>
              </span>
              <br />
              <span>Place: Trivandrum</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-lg font-bold">(sd/-)</span>
            <span className="block text-lg font-bold">Director</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
