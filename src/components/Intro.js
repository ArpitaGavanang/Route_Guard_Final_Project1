
import React from 'react';
import hemangiImg from 'D:/C DAC NOTES/PG-DAC-Mar24/Final Project/RouteGuardFrontend/mld/src/images/WhatsApp Image 2024-08-17 at 04.11.24_3356fdf2.jpg';
import arpitaImg from 'D:/C DAC NOTES/PG-DAC-Mar24/Final Project/RouteGuardFrontend/mld/src/images/240340320019.jpg';
import pic1Img from 'D:/C DAC NOTES/PG-DAC-Mar24/Final Project/RouteGuardFrontend/mld/src/images/pic1.jpg';
import unknown3Img from 'C:/Users/arpit/FrontEnd1-RouteGaurd-/src/images/Vishal.jpeg.jpg';
import unknown2Img from 'C:/Users/arpit/FrontEnd1-RouteGaurd-/src/images/IMG_20240425_074033.jpg';
import Layout from './Layout/Layout';
//C:/Users/arpit/FrontEnd1-RouteGaurd-/src/images/IMG_20240425_074033.jpg
const teamMembers = [
    { name: 'Hemangi Tamore', img: hemangiImg },
    { name: 'Arpita Gavanang', img: arpitaImg },
    { name: 'Pratik More', img: pic1Img },
    { name: 'Vishal Kamble', img: unknown3Img },
    { name: 'Gajanan Devkatte', img: unknown2Img }
];

const Intro = () => {
    return (
        <Layout>
            <div className="m-auto max-w-6xl p-2 md:p-12 h-5/6" id='about'>
                <div className="text-center mb-8">
                    <h3 className="text-3xl text-blue-900 font-bold">Meet Our Team</h3>
                    <p className='my-3 text-xl text-gray-600 font-semibold'>We have a dedicated team ready to help you achieve your goals.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="text-center" data-aos="fade-up">
                            <img alt={member.name} className="rounded-full mx-auto mb-4 w-40 h-40 object-cover" src={member.img} />
                            <h4 className="text-xl text-blue-900 font-bold">{member.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Intro;
