import Stylesheet from '@/components/ui/Stylesheet';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button/Button';
import { $, $$, esc, reduce } from '@/lib/site';
import '@/app/tailwind-sections.css';
import Tabs from '@/components/ui/Tabs/Tabs';
import { initTabs } from '@/components/ui/Tabs/tabs-core';

const DR_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

const PORTRAIT = "/assets/img/toppers/portrait/2025/";
const PHOTO = "/assets/img/toppers/";

export const TOPPERS_2025 = [
  { rank: 1, name: "Anuj Agnihotri", programmes: ["Interview Guidance Programme"], photo: PORTRAIT + "01-anuj-agnihotri.webp" },
  { rank: 2, name: "Rajeshwari Suve", programmes: ["PowerUp Prelims Test Series", "Interview Guidance Programme", "Mains 2020 Test Series"], photo: PORTRAIT + "02-rajeshwari-suve-m.webp" },
  { rank: 3, name: "Akansh Dhull", programmes: ["General Studies Prelims-cum-Mains Classroom Programme"], photo: PORTRAIT + "03-akansh-dhull.webp" },
  { rank: 4, name: "Raghav Jhunjhunwala", programmes: ["Interview Guidance Programme"], photo: PORTRAIT + "04-raghav-jhunjhunwala.webp" },
  { rank: 5, name: "Ishan Bhatnagar", programmes: ["Sociology Optional Crash Course", "Sociology Enrichment Course", "Prelims CAMP (Online and Offline)", "Interview Guidance Programme"], photo: PORTRAIT + "05-ishan-bhatnagar.webp" },
  { rank: 6, name: "Zinnia Aurora", programmes: ["GS Ethics Module", "Interview Guidance Programme", "Power Up 23 Combined Test Series for Prelims 2023"], photo: PORTRAIT + "06-zinnia-aurora.webp" },
  { rank: 7, name: "A R Rajah Mohaideen", programmes: ["Interview Guidance Programme"], photo: PORTRAIT + "07-a-r-rajah-mohaideen.webp" },
  { rank: 8, name: "Pakshal Secretry", programmes: ["Mains Camp", "Interview Guidance Programme"], photo: PORTRAIT + "08-pakshal-secretry.webp" },
  { rank: 9, name: "Astha Jain", programmes: ["Interview Guidance Programme"], photo: PORTRAIT + "09-astha-jain.webp" },
  { rank: 10, name: "Ujjwal Priyank", programmes: ["Interview Guidance Programme"], photo: PORTRAIT + "10-ujjwal-priyank.webp" },
  { rank: 11, name: "Yashaswi Raj Vardhan", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-11-yashaswi-raj-vardhan.webp" },
  { rank: 12, name: "Akshit Bhardwaj", programmes: ["Prelims CAMP", "General Studies", "Interview Guidance Programme"], photo: PHOTO + "2025-12-akshit-bhardwaj.webp" },
  { rank: 13, name: "Ananya Sharma", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-13-ananya-sharma.webp" },
  { rank: 14, name: "Surabhi Yadav", programmes: ["Ethics Answer Writing Prog.", "Interview Guidance Programme"], photo: PHOTO + "2025-14-surabhi-yadav.webp" },
  { rank: 15, name: "Simrandeep Kaur", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-15-simrandeep-kaur.webp" },
  { rank: 16, name: "Monika Srivastava", programmes: ["GS Ethics Module", "Sure Shot Mains - FLT-A2", "Essay Module", "SMART Current Affairs Programme"], photo: PHOTO + "2025-16-monika-srivastava.webp" },
  { rank: 18, name: "Sruthii R", programmes: ["General Studies", "Sociology Optional"], photo: PHOTO + "2025-18-sruthii-r.webp" },
  { rank: 19, name: "Nisar Dishant Amrutlal", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-19-nisar-dishant-amrutlal.webp" },
  { rank: 21, name: "Shubham Singh", programmes: ["Ethics Answer Writing Program", "Ethics Module Course"], photo: PHOTO + "2025-21-shubham-singh.webp" },
  { rank: 22, name: "Geetika Arora", programmes: ["General Studies"], photo: PHOTO + "2025-22-geetika-arora.webp" },
  { rank: 23, name: "Jeenu Sri Jaswanth Chandra", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-23-jeenu-sri-jaswanth-chandra.webp" },
  { rank: 25, name: "Bhavika Chopra", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-25-bhavika-chopra.webp" },
  { rank: 27, name: "Vikas", programmes: ["IGS Ethics Module", "Interview Guidance Programme", "SMART Current Affairs Programme", "PSIR Optional Mains Test Series-A2", "Essay Module", "Sure Shot Mains - FLT-A2"], photo: PHOTO + "2025-27-vikas.webp" },
  { rank: 31, name: "Aryan Yadav", programmes: ["PowerUp Prelims Test Series 2024: Offline", "Online"], photo: PHOTO + "2025-31-aryan-yadav.webp" },
  { rank: 33, name: "Mayank Purohit", programmes: ["Ethics Answer Writing Programme"], photo: PHOTO + "2025-33-mayank-purohit.webp" },
  { rank: 34, name: "Nancy Singh", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-34-nancy-singh.webp" },
];

export const TOPPERS=[{"n":"Anuj Agnihotri","r":1,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-1-anuj-agnihotri.webp"},{"n":"Rajeshwari Suve M","r":2,"y":2025,"c":"PowerUp Prelims Test Series, IGP, Mains 2020 Test Series","src":"assets/img/toppers/2025-2-rajeshwari-suve-m.webp"},{"n":"Akansh Dhull","r":3,"y":2025,"c":"General Studies Prelims Cum Mains Classroom Programme","src":"assets/img/toppers/2025-3-akansh-dhull.webp"},{"n":"Raghav Jhunjhunwala","r":4,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-4-raghav-jhunjhunwala.webp"},{"n":"Ishan Bhatnagar","r":5,"y":2025,"c":"Sociology Optional Crash Course, Sociology Enrichment Course, Prelims CAMP (Online and Offline), IGP","src":"assets/img/toppers/2025-5-ishan-bhatnagar.webp"},{"n":"Zinnia Aurora","r":6,"y":2025,"c":"GS Ethics Module, IGP, Power Up 23 Combined Test Series for Prelims 2023","src":"assets/img/toppers/2025-6-zinnia-aurora.webp"},{"n":"A R Rajah Mohaideen","r":7,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-7-a-r-rajah-mohaideen.webp"},{"n":"Pakshal Secretry","r":8,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-8-pakshal-secretry.webp"},{"n":"Astha Jain","r":9,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-9-astha-jain.webp"},{"n":"Ujjwal Priyank","r":10,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-10-ujjwal-priyank.webp"},{"n":"Yashaswi Raj Vardhan","r":11,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-11-yashaswi-raj-vardhan.webp"},{"n":"Akshit Bhardwaj","r":12,"y":2025,"c":"Prelims CAMP, General Studies, IGP","src":"assets/img/toppers/2025-12-akshit-bhardwaj.webp"},{"n":"Ananya Sharma","r":13,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-13-ananya-sharma.webp"},{"n":"Surabhi Yadav","r":14,"y":2025,"c":"Ethics Answer Writing Prog. & IGP","src":"assets/img/toppers/2025-14-surabhi-yadav.webp"},{"n":"Simrandeep Kaur","r":15,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-15-simrandeep-kaur.webp"},{"n":"Monika Srivastava","r":16,"y":2025,"c":"GS Ethics Module, Sure Shot Mains - FLT-A2, Essay Module, SMART Current Affairs Programme","src":"assets/img/toppers/2025-16-monika-srivastava.webp"},{"n":"Sruthii R","r":18,"y":2025,"c":"General Studies, Sociology Optional","src":"assets/img/toppers/2025-18-sruthii-r.webp"},{"n":"Nisar Dishant Amrutlal","r":19,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-19-nisar-dishant-amrutlal.webp"},{"n":"Shubham Singh","r":21,"y":2025,"c":"Ethics Answer Writing Program, Ethics Module Course","src":"assets/img/toppers/2025-21-shubham-singh.webp"},{"n":"Geetika Arora","r":22,"y":2025,"c":"General Studies","src":"assets/img/toppers/2025-22-geetika-arora.webp"},{"n":"Jeenu Sri Jaswanth Chandra","r":23,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-23-jeenu-sri-jaswanth-chandra.webp"},{"n":"Bhavika Chopra","r":25,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-25-bhavika-chopra.webp"},{"n":"Vikas","r":27,"y":2025,"c":"IGS Ethics Module, IGP, SMART Current Affairs Programme, PSIR Optional Mains Test Series-A2, Essay Module, Sure Shot Mains - FLT-A2","src":"assets/img/toppers/2025-27-vikas.webp"},{"n":"Aryan Yadav","r":31,"y":2025,"c":"PowerUp Prelims Test Series 2024: Offline & Online","src":"assets/img/toppers/2025-31-aryan-yadav.webp"},{"n":"Mayank Purohit","r":33,"y":2025,"c":"Ethics Answer Writing Programme","src":"assets/img/toppers/2025-33-mayank-purohit.webp"},{"n":"Nancy Singh","r":34,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-34-nancy-singh.webp"},{"n":"Vaibhavi Agrawal","r":35,"y":2025,"c":"PowerUp Prelims Test Series 2024, GS Ethics Module, Essay Module, General Studies, Mathematics Enrichment Course, VTS Upgrade Mains Test Series, Mathematics Mains Test Series, Online PowerUP Prelims Programme","src":"assets/img/toppers/2025-35-vaibhavi-agrawal.webp"},{"n":"Deepali Mahto","r":36,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-36-deepali-mahto.webp"},{"n":"Sakshi Jain","r":37,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-37-sakshi-jain.webp"},{"n":"Deepanshu Jindal","r":38,"y":2025,"c":"IGP, Ethics Answer Writing Programme","src":"assets/img/toppers/2025-38-deepanshu-jindal.webp"},{"n":"Diksha Rai","r":40,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-40-diksha-rai.webp"},{"n":"Sudipa Dutta","r":41,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-41-sudipa-dutta.webp"},{"n":"Rupal Jaiswal","r":43,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-43-rupal-jaiswal.webp"},{"n":"Deeksha Chourasiya","r":44,"y":2025,"c":"Essay Module, History Enrichment Course, History Mains Test Series, IGP","src":"assets/img/toppers/2025-44-deeksha-chourasiya.webp"},{"n":"Shambhavi Tiwari","r":46,"y":2025,"c":"IGP","src":"assets/img/toppers/2025-46-shambhavi-tiwari.webp"},{"n":"Aniket Ranjan","r":48,"y":2025,"c":"Ethics Module Course, Ethics Answer Writing Programme","src":"assets/img/toppers/2025-48-aniket-ranjan.webp"},{"n":"Shakti Dubey","r":1,"y":2024,"c":"General Studies PCM 10 Months, Sure Shot Mains Test Series, Power Up Prelims Test Series, Smart Current Affairs","src":"assets/img/toppers/2024-1-shakti-dubey.webp"},{"n":"Harshita Goyal","r":2,"y":2024,"c":"Powerup Prelims Test Series, Interview Guidance Program","src":"assets/img/toppers/2024-2-harshita-goyal.webp"},{"n":"Dongre Archit Parag","r":3,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-3-dongre-archit-parag.webp"},{"n":"Shah Margi Chirag","r":4,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-4-shah-margi-chirag.webp"},{"n":"Aakash Garg","r":5,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-5-aakash-garg.webp"},{"n":"Komal Punia`","r":6,"y":2024,"c":"General Studies PCM 10 Months, Sure Shot Mains Test Series, SMART Current Affairs, Essay Module","src":"assets/img/toppers/2024-6-komal-punia.webp"},{"n":".Aayushi Bansal","r":7,"y":2024,"c":"General Studies PCM 10 Months, Optional Sociology, Ethics Module, Sociology Mains Test Series","src":"assets/img/toppers/2024-7-aayushi-bansal.webp"},{"n":"Mayank Tripathi","r":10,"y":2024,"c":"General Studies PCM 10 Months","src":"assets/img/toppers/2024-10-mayank-tripathi.webp"},{"n":"Ashi Sharma","r":12,"y":2024,"c":"General Studies PCM 10 Months, Optional Public Administration, Step Up Mentorship","src":"assets/img/toppers/2024-12-ashi-sharma.webp"},{"n":"Abhishek Vashishtha","r":14,"y":2024,"c":"General Studies PCM 10 Months","src":"assets/img/toppers/2024-14-abhishek-vashishtha.webp"},{"n":"Banna Venkatesh","r":15,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-15-banna-venkatesh.webp"},{"n":"Madhav Agarwal","r":16,"y":2024,"c":"Commerce Mains Test Series, Ethics Module","src":"assets/img/toppers/2024-16-madhav-agarwal.webp"},{"n":"Sanskriti Trivedy","r":17,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-17-sanskriti-trivedy.webp"},{"n":"Saumya Mishra","r":18,"y":2024,"c":"General Studies PCM 10 Months","src":"assets/img/toppers/2024-18-saumya-mishra.webp"},{"n":"Vibhor Bhardwaj","r":19,"y":2024,"c":"General Studies PCM 10 Months, Ethics Module","src":"assets/img/toppers/2024-19-vibhor-bhardwaj.webp"},{"n":"Divyank Gupta","r":21,"y":2024,"c":"Ethics Module 2024, Interview Guidance Program","src":"assets/img/toppers/2024-21-divyank-gupta.webp"},{"n":"Riya Saini.","r":22,"y":2024,"c":"Interview Guidance Program, PowerUp Prelims Test Series","src":"assets/img/toppers/2024-22-riya-saini.webp"},{"n":"B Sivachandran","r":23,"y":2024,"c":"Commerce Mains Test Series","src":"assets/img/toppers/2024-23-b-sivachandran.webp"},{"n":"R Rangamanju","r":24,"y":2024,"c":"Ethics Module 2024, Interview Guidance Program","src":"assets/img/toppers/2024-24-r-rangamanju.webp"},{"n":"Shivansh Subhash Jagade","r":26,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-26-shivansh-subhash-jagade.webp"},{"n":"Panchal Smit Hasmukhbhai","r":30,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-30-panchal-smit-hasmukhbhai.webp"},{"n":"Shreya Tyagi","r":31,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-31-shreya-tyagi.webp"},{"n":"'Utkarsh Yadav","r":32,"y":2024,"c":"General Studies PCM 10 Months, Essay Module Course, Mains Test Series, Prelims Test Series","src":"assets/img/toppers/2024-32-utkarsh-yadav.webp"},{"n":"Alfred Thomas","r":33,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-33-alfred-thomas.webp"},{"n":"Abhi Jain","r":34,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-34-abhi-jain.webp"},{"n":"Shreyak Garg","r":35,"y":2024,"c":"Essay Test Series, Ethics Module, Essay Module, Interview Guidance Program","src":"assets/img/toppers/2024-35-shreyak-garg.webp"},{"n":"Muskan Srivastava","r":36,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-36-muskan-srivastava.webp"},{"n":"Shobhika Pathak","r":37,"y":2024,"c":"Sure Shot Mains Test Series, Online Prelims Test Series, Interview Guidance Program","src":"assets/img/toppers/2024-37-shobhika-pathak.webp"},{"n":"Monica R","r":39,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-39-monica-r.webp"},{"n":"Iram Choudhary","r":40,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-40-iram-choudhary.webp"},{"n":"Sachin Basavaraj Guttur","r":41,"y":2024,"c":"General Studies PCM 10 Months","src":"assets/img/toppers/2024-41-sachin-basavaraj-guttur.webp"},{"n":"Pavithra P","r":42,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-42-pavithra-p.webp"},{"n":"Avdhija Gupta","r":43,"y":2024,"c":"Prelims Test Series","src":"assets/img/toppers/2024-43-avdhija-gupta.webp"},{"n":"Ravula Jayasimha Reddy","r":46,"y":2024,"c":"Ethics Module","src":"assets/img/toppers/2024-46-ravula-jayasimha-reddy.webp"},{"n":"NANDANAA G P","r":47,"y":2024,"c":"Ethics Module, Interview Guidance Program","src":"assets/img/toppers/2024-47-nandanaa-g-p.webp"},{"n":"Ritika Rath","r":48,"y":2024,"c":"Prelims Test Series, Interview Guidance Program","src":"assets/img/toppers/2024-48-ritika-rath.webp"},{"n":"Sourav Sinha","r":49,"y":2024,"c":"Interview Guidance Program","src":"assets/img/toppers/2024-49-sourav-sinha.webp"},{"n":"Ankur Tripathi","r":50,"y":2024,"c":"General Studies PCM 10 Months, Interview Guidance Program","src":"assets/img/toppers/2024-50-ankur-tripathi.webp"},{"n":"Aditya Srivastava","r":1,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-1-aditya-srivastava.webp"},{"n":"Animesh Pradhan","r":2,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-2-animesh-pradhan.webp"},{"n":"Donuru Ananya Reddy","r":3,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-3-donuru-ananya-reddy.webp"},{"n":"Ruhani","r":5,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-5-ruhani.webp"},{"n":"Srishti Dabas","r":6,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-6-srishti-dabas.webp"},{"n":"Ashish Kumar","r":8,"y":2023,"c":"Sociology & IGP","src":"assets/img/toppers/2023-8-ashish-kumar.webp"},{"n":"Nausheen","r":9,"y":2023,"c":"Test Series & IGP","src":"assets/img/toppers/2023-9-nausheen.webp"},{"n":"Aishwaryam Prajapati","r":10,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-10-aishwaryam-prajapati.webp"},{"n":"Medha Anand","r":13,"y":2023,"c":"GS Classroom, Sociology, & IGP","src":"assets/img/toppers/2023-13-medha-anand.webp"},{"n":"Kunal Rastogi","r":15,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-15-kunal-rastogi.webp"},{"n":"Ayan Jain","r":16,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-16-ayan-jain.webp"},{"n":"Swati Sharma","r":17,"y":2023,"c":"Test Series & IGP","src":"assets/img/toppers/2023-17-swati-sharma.webp"},{"n":"Wardah Khan","r":18,"y":2023,"c":"GS Classroom, Essay, & IGP","src":"assets/img/toppers/2023-18-wardah-khan.webp"},{"n":"Shivam Kumar","r":19,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-19-shivam-kumar.webp"},{"n":"Akash Verma","r":20,"y":2023,"c":"GS Mains Test Series, Public Administration Optional Mains Test Series, & IGP","src":"assets/img/toppers/2023-20-akash-verma.webp"},{"n":"Pururaj Singh Solanki","r":21,"y":2023,"c":"GS Classroom, Essay, & IGP","src":"assets/img/toppers/2023-21-pururaj-singh-solanki.webp"},{"n":"Saurabh Sharma","r":23,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-23-saurabh-sharma.webp"},{"n":"Prajnanandan Giri","r":24,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-24-prajnanandan-giri.webp"},{"n":"Ritika Verma","r":25,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-25-ritika-verma.webp"},{"n":"Rupal Rana","r":26,"y":2023,"c":"Political Science & IGP","src":"assets/img/toppers/2023-26-rupal-rana.webp"},{"n":"Nandala Saikiran","r":27,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-27-nandala-saikiran.webp"},{"n":"Pawan Kumar Goel","r":28,"y":2023,"c":"Sociology, Mains Test Series","src":"assets/img/toppers/2023-28-pawan-kumar-goel.webp"},{"n":"Saloni Chhabra","r":29,"y":2023,"c":"GS Classroom & IGP","src":"assets/img/toppers/2023-29-saloni-chhabra.webp"},{"n":"Vishnu Sasikumar","r":31,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-31-vishnu-sasikumar.webp"},{"n":"Arjun Gupta","r":32,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-32-arjun-gupta.webp"},{"n":"Zufishan Haque","r":34,"y":2023,"c":"GS & Test Series Anthropology","src":"assets/img/toppers/2023-34-zufishan-haque.webp"},{"n":"Abhinav Jain","r":35,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-35-abhinav-jain.webp"},{"n":"Ayushi Pradhan","r":36,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-36-ayushi-pradhan.webp"},{"n":"Tejas Agnihotri","r":37,"y":2023,"c":"GS Classroom & IGP","src":"assets/img/toppers/2023-37-tejas-agnihotri.webp"},{"n":"Animesh Verma","r":38,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-38-animesh-verma.webp"},{"n":"Deepti Rohilla","r":39,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-39-deepti-rohilla.webp"},{"n":"Akanchha Singh","r":44,"y":2023,"c":"GS Classroom & IGP","src":"assets/img/toppers/2023-44-akanchha-singh.webp"},{"n":"Ramya R","r":45,"y":2023,"c":"Test Series & IGP","src":"assets/img/toppers/2023-45-ramya-r.webp"},{"n":"Bhawesh","r":46,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-46-bhawesh.webp"},{"n":"Basant Singh","r":47,"y":2023,"c":"GS Classroom & IGP","src":"assets/img/toppers/2023-47-basant-singh.webp"},{"n":"Anshul Hindal","r":48,"y":2023,"c":"IGP","src":"assets/img/toppers/2023-48-anshul-hindal.webp"},{"n":"K N Chandana Jahnavi","r":50,"y":2023,"c":"Test Series & IGP","src":"assets/img/toppers/2023-50-k-n-chandana-jahnavi.webp"},{"n":"Ishita kishore","r":1,"y":2022,"c":"","src":"assets/img/toppers/2022-1-ishita-kishore.webp"},{"n":"Garima Lohia","r":2,"y":2022,"c":"","src":"assets/img/toppers/2022-2-garima-lohia.webp"},{"n":"Uma Harathi N","r":3,"y":2022,"c":"","src":"assets/img/toppers/2022-3-uma-harathi-n.webp"},{"n":"Smriti Mishra","r":4,"y":2022,"c":"","src":"assets/img/toppers/2022-4-smriti-mishra.webp"},{"n":"Mayur Hazarika","r":5,"y":2022,"c":"","src":"assets/img/toppers/2022-5-mayur-hazarika.webp"},{"n":"Kanika Goyal","r":9,"y":2022,"c":"","src":"assets/img/toppers/2022-9-kanika-goyal.webp"},{"n":"Rahul Srivastava","r":10,"y":2022,"c":"","src":"assets/img/toppers/2022-10-rahul-srivastava.webp"},{"n":"Abhinav Siwach","r":12,"y":2022,"c":"","src":"assets/img/toppers/2022-12-abhinav-siwach.webp"},{"n":"Vidushi Singh","r":13,"y":2022,"c":"","src":"assets/img/toppers/2022-13-vidushi-singh.webp"},{"n":"Kritika Goyal","r":14,"y":2022,"c":"","src":"assets/img/toppers/2022-14-kritika-goyal.webp"},{"n":"Swati Sharma","r":15,"y":2022,"c":"","src":"assets/img/toppers/2022-15-swati-sharma.webp"},{"n":"Shishir Kumar Singh","r":16,"y":2022,"c":"","src":"assets/img/toppers/2022-16-shishir-kumar-singh.webp"},{"n":"Siddharth Shukla","r":18,"y":2022,"c":"","src":"assets/img/toppers/2022-18-siddharth-shukla.webp"},{"n":"Laghima Tiwari","r":19,"y":2022,"c":"","src":"assets/img/toppers/2022-19-laghima-tiwari.webp"},{"n":"Anoushka Sharma","r":20,"y":2022,"c":"","src":"assets/img/toppers/2022-20-anoushka-sharma.webp"},{"n":"Shruti Sharma","r":1,"y":2021,"c":"","src":"assets/img/toppers/2021-1-shruti-sharma.jpg"},{"n":"Ankita Agarwal","r":2,"y":2021,"c":"","src":"assets/img/toppers/2021-2-ankita-agarwal.jpg"},{"n":"Gamini Singla","r":3,"y":2021,"c":"","src":"assets/img/toppers/2021-3-gamini-singla.jpg"},{"n":"Aishwarya Verma","r":4,"y":2021,"c":"","src":"assets/img/toppers/2021-4-aishwarya-verma.jpg"},{"n":"Yaksh Chaudhary","r":6,"y":2021,"c":"","src":"assets/img/toppers/2021-6-yaksh-chaudhary.jpg"},{"n":"Samyak S Jain","r":7,"y":2021,"c":"","src":"assets/img/toppers/2021-7-samyak-s-jain.jpg"},{"n":"Preetam Kumar","r":9,"y":2021,"c":"","src":"assets/img/toppers/2021-9-preetam-kumar.jpg"},{"n":"Harkeerat Singh Randhawa","r":10,"y":2021,"c":"","src":"assets/img/toppers/2021-10-harkeerat-singh-randhawa.jpg"},{"n":"Yasharth Shekhar","r":12,"y":2021,"c":"","src":"assets/img/toppers/2021-12-yasharth-shekhar.jpg"},{"n":"Abhinav J Jain - Rank 14","r":14,"y":2021,"c":"","src":"assets/img/toppers/2021-14-abhinav-j-jain-rank-14.jpg"},{"n":"Yaswanth Kumar Reddy","r":15,"y":2021,"c":"","src":"assets/img/toppers/2021-15-yaswanth-kumar-reddy.jpg"},{"n":"Anshu Priya","r":16,"y":2021,"c":"","src":"assets/img/toppers/2021-16-anshu-priya.jpg"},{"n":"Arpit Chauhan","r":20,"y":2021,"c":"","src":"assets/img/toppers/2021-20-arpit-chauhan.jpg"},{"n":"Shubham Kumar","r":1,"y":2020,"c":"","src":"assets/img/toppers/2020-1-shubham-kumar.jpg"},{"n":"Jagrati Awasthi","r":2,"y":2020,"c":"","src":"assets/img/toppers/2020-2-jagrati-awasthi.jpg"},{"n":"Ankita Jain","r":3,"y":2020,"c":"","src":"assets/img/toppers/2020-3-ankita-jain.jpg"},{"n":"Mamta Yadav","r":5,"y":2020,"c":"","src":"assets/img/toppers/2020-5-mamta-yadav.jpg"},{"n":"Apala Mishra","r":9,"y":2020,"c":"","src":"assets/img/toppers/2020-9-apala-mishra.jpg"},{"n":"Satyam Gandhi","r":10,"y":2020,"c":"","src":"assets/img/toppers/2020-10-satyam-gandhi.jpg"},{"n":"Pradeep Singh","r":1,"y":2019,"c":"","src":"assets/img/toppers/2019-1-pradeep-singh.jpg"},{"n":"Himanshu Jain","r":4,"y":2019,"c":"","src":"assets/img/toppers/2019-4-himanshu-jain.jpg"},{"n":"Vishakha Yadav","r":6,"y":2019,"c":"","src":"assets/img/toppers/2019-6-vishakha-yadav.jpg"},{"n":"Abhishek Saraf","r":8,"y":2019,"c":"","src":"assets/img/toppers/2019-8-abhishek-saraf.jpg"},{"n":"Ravi Jain","r":9,"y":2019,"c":"","src":"assets/img/toppers/2019-9-ravi-jain.jpg"},{"n":"Kanishak Kataria","r":1,"y":2018,"c":"","src":"assets/img/toppers/2018-1-kanishak-kataria.jpg"},{"n":"Akshat Jain","r":2,"y":2018,"c":"","src":"assets/img/toppers/2018-2-akshat-jain.jpg"},{"n":"Junaid Ahmad","r":3,"y":2018,"c":"","src":"assets/img/toppers/2018-3-junaid-ahmad.jpg"},{"n":"Shreyans Kumat","r":4,"y":2018,"c":"","src":"assets/img/toppers/2018-4-shreyans-kumat.jpg"},{"n":"Karnati Varun Reddy","r":7,"y":2018,"c":"","src":"assets/img/toppers/2018-7-karnati-varun-reddy.jpg"},{"n":"Vaishali Singh","r":8,"y":2018,"c":"","src":"assets/img/toppers/2018-8-vaishali-singh.jpg"},{"n":"Gunjan Dwivedi","r":9,"y":2018,"c":"","src":"assets/img/toppers/2018-9-gunjan-dwivedi.jpg"},{"n":"Tanmay Vashistha Sharma","r":10,"y":2018,"c":"","src":"assets/img/toppers/2018-10-tanmay-vashistha-sharma.jpg"},{"n":"Durishetty Anudeep","r":1,"y":2017,"c":"","src":"assets/img/toppers/2017-1-durishetty-anudeep.jpg"},{"n":"Anu Kumari","r":2,"y":2017,"c":"","src":"assets/img/toppers/2017-2-anu-kumari.jpg"},{"n":"Sachin Gupta","r":3,"y":2017,"c":"","src":"assets/img/toppers/2017-3-sachin-gupta.jpg"},{"n":"Atul Prakash","r":4,"y":2017,"c":"","src":"assets/img/toppers/2017-4-atul-prakash.jpg"},{"n":"Pratham Kaushik","r":5,"y":2017,"c":"","src":"assets/img/toppers/2017-5-pratham-kaushik.jpg"},{"n":"Koya Sree Harsha","r":6,"y":2017,"c":"","src":"assets/img/toppers/2017-6-koya-sree-harsha.jpg"},{"n":"Ayush Sinha","r":7,"y":2017,"c":"","src":"assets/img/toppers/2017-7-ayush-sinha.jpg"},{"n":"Abhishek Surana","r":10,"y":2017,"c":"","src":"assets/img/toppers/2017-10-abhishek-surana.jpg"},{"n":"Nandini KR","r":1,"y":2016,"c":"","src":"assets/img/toppers/2016-1-nandini-kr.jpg"},{"n":"Anmol Sher Singh","r":2,"y":2016,"c":"","src":"assets/img/toppers/2016-2-anmol-sher-singh.jpg"},{"n":"Kothamasu Dinesh Kumar","r":6,"y":2016,"c":"","src":"assets/img/toppers/2016-6-kothamasu-dinesh-kumar.jpg"},{"n":"Anand Vardhan","r":7,"y":2016,"c":"","src":"assets/img/toppers/2016-7-anand-vardhan.jpg"},{"n":"Shweta Chauhan","r":8,"y":2016,"c":"","src":"assets/img/toppers/2016-8-shweta-chauhan.jpg"},{"n":"Sumansourav Mohanty","r":9,"y":2016,"c":"","src":"assets/img/toppers/2016-9-sumansourav-mohanty.jpg"},{"n":"Bilal Mohi Ud Din Bhat","r":10,"y":2016,"c":"","src":"assets/img/toppers/2016-10-bilal-mohi-ud-din-bhat.jpg"}];

export const NP_ARCHIVE={"ARCHIVE_YEARS":[2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015],"ARCHIVE":{"2015":[{"rank":1,"name":"Rank holder 1","programmes":"","img":"assets/img/toppers/portrait/placeholder-man.webp","photo":"assets/img/toppers/portrait/placeholder-man.webp"},{"rank":2,"name":"Rank holder 2","programmes":"","img":"assets/img/toppers/portrait/placeholder-man.webp","photo":"assets/img/toppers/portrait/placeholder-man.webp"},{"rank":3,"name":"Rank holder 3","programmes":"","img":"assets/img/toppers/portrait/placeholder-man.webp","photo":"assets/img/toppers/portrait/placeholder-man.webp"},{"rank":4,"name":"Rank holder 4","programmes":"","img":"assets/img/toppers/portrait/placeholder-man.webp","photo":"assets/img/toppers/portrait/placeholder-man.webp"},{"rank":5,"name":"Rank holder 5","programmes":"","img":"assets/img/toppers/portrait/placeholder-man.webp","photo":"assets/img/toppers/portrait/placeholder-man.webp"},{"rank":6,"name":"Rank holder 6","programmes":"","img":"assets/img/toppers/portrait/placeholder-man.webp","photo":"assets/img/toppers/portrait/placeholder-man.webp"}],"2016":[{"rank":1,"name":"Nandini KR","programmes":"","img":"assets/img/toppers/archive/2016/01-nandini-kr.webp","photo":"assets/img/toppers/2016-1-nandini-kr.jpg"},{"rank":2,"name":"Anmol Sher Singh","programmes":"","img":"assets/img/toppers/archive/2016/02-anmol-sher-singh.webp","photo":"assets/img/toppers/2016-2-anmol-sher-singh.jpg"},{"rank":6,"name":"Kothamasu Dinesh Kumar","programmes":"","img":"assets/img/toppers/archive/2016/06-kothamasu-dinesh-kumar.webp","photo":"assets/img/toppers/2016-6-kothamasu-dinesh-kumar.jpg"},{"rank":7,"name":"Anand Vardhan","programmes":"","img":"assets/img/toppers/archive/2016/07-anand-vardhan.webp","photo":"assets/img/toppers/2016-7-anand-vardhan.jpg"},{"rank":8,"name":"Shweta Chauhan","programmes":"","img":"assets/img/toppers/archive/2016/08-shweta-chauhan.webp","photo":"assets/img/toppers/2016-8-shweta-chauhan.jpg"},{"rank":9,"name":"Sumansourav Mohanty","programmes":"","img":"assets/img/toppers/archive/2016/09-sumansourav-mohanty.webp","photo":"assets/img/toppers/2016-9-sumansourav-mohanty.jpg"},{"rank":10,"name":"Bilal Mohi Ud Din Bhat","programmes":"","img":"assets/img/toppers/archive/2016/10-bilal-mohi-ud-din-bhat.webp","photo":"assets/img/toppers/2016-10-bilal-mohi-ud-din-bhat.jpg"}],"2017":[{"rank":1,"name":"Durishetty Anudeep","programmes":"","img":"assets/img/toppers/archive/2017/01-durishetty-anudeep.webp","photo":"assets/img/toppers/2017-1-durishetty-anudeep.jpg"},{"rank":2,"name":"Anu Kumari","programmes":"","img":"assets/img/toppers/archive/2017/02-anu-kumari.webp","photo":"assets/img/toppers/2017-2-anu-kumari.jpg"},{"rank":3,"name":"Sachin Gupta","programmes":"","img":"assets/img/toppers/archive/2017/03-sachin-gupta.webp","photo":"assets/img/toppers/2017-3-sachin-gupta.jpg"},{"rank":4,"name":"Atul Prakash","programmes":"","img":"assets/img/toppers/archive/2017/04-atul-prakash.webp","photo":"assets/img/toppers/2017-4-atul-prakash.jpg"},{"rank":5,"name":"Pratham Kaushik","programmes":"","img":"assets/img/toppers/archive/2017/05-pratham-kaushik.webp","photo":"assets/img/toppers/2017-5-pratham-kaushik.jpg"},{"rank":6,"name":"Koya Sree Harsha","programmes":"","img":"assets/img/toppers/archive/2017/06-koya-sree-harsha.webp","photo":"assets/img/toppers/2017-6-koya-sree-harsha.jpg"},{"rank":7,"name":"Ayush Sinha","programmes":"","img":"assets/img/toppers/archive/2017/07-ayush-sinha.webp","photo":"assets/img/toppers/2017-7-ayush-sinha.jpg"},{"rank":10,"name":"Abhishek Surana","programmes":"","img":"assets/img/toppers/archive/2017/10-abhishek-surana.webp","photo":"assets/img/toppers/2017-10-abhishek-surana.jpg"}],"2018":[{"rank":1,"name":"Kanishak Kataria","programmes":"","img":"assets/img/toppers/archive/2018/01-kanishak-kataria.webp","photo":"assets/img/toppers/2018-1-kanishak-kataria.jpg"},{"rank":2,"name":"Akshat Jain","programmes":"","img":"assets/img/toppers/archive/2018/02-akshat-jain.webp","photo":"assets/img/toppers/2018-2-akshat-jain.jpg"},{"rank":3,"name":"Junaid Ahmad","programmes":"","img":"assets/img/toppers/archive/2018/03-junaid-ahmad.webp","photo":"assets/img/toppers/2018-3-junaid-ahmad.jpg"},{"rank":4,"name":"Shreyans Kumat","programmes":"","img":"assets/img/toppers/archive/2018/04-shreyans-kumat.webp","photo":"assets/img/toppers/2018-4-shreyans-kumat.jpg"},{"rank":7,"name":"Karnati Varun Reddy","programmes":"","img":"assets/img/toppers/archive/2018/07-karnati-varun-reddy.webp","photo":"assets/img/toppers/2018-7-karnati-varun-reddy.jpg"},{"rank":8,"name":"Vaishali Singh","programmes":"","img":"assets/img/toppers/archive/2018/08-vaishali-singh.webp","photo":"assets/img/toppers/2018-8-vaishali-singh.jpg"},{"rank":9,"name":"Gunjan Dwivedi","programmes":"","img":"assets/img/toppers/archive/2018/09-gunjan-dwivedi.webp","photo":"assets/img/toppers/2018-9-gunjan-dwivedi.jpg"},{"rank":10,"name":"Tanmay Vashistha Sharma","programmes":"","img":"assets/img/toppers/archive/2018/10-tanmay-vashistha-sharma.webp","photo":"assets/img/toppers/2018-10-tanmay-vashistha-sharma.jpg"}],"2019":[{"rank":1,"name":"Pradeep Singh","programmes":"","img":"assets/img/toppers/archive/2019/01-pradeep-singh.webp","photo":"assets/img/toppers/2019-1-pradeep-singh.jpg"},{"rank":4,"name":"Himanshu Jain","programmes":"","img":"assets/img/toppers/archive/2019/04-himanshu-jain.webp","photo":"assets/img/toppers/2019-4-himanshu-jain.jpg"},{"rank":6,"name":"Vishakha Yadav","programmes":"","img":"assets/img/toppers/archive/2019/06-vishakha-yadav.webp","photo":"assets/img/toppers/2019-6-vishakha-yadav.jpg"},{"rank":8,"name":"Abhishek Saraf","programmes":"","img":"assets/img/toppers/archive/2019/08-abhishek-saraf.webp","photo":"assets/img/toppers/2019-8-abhishek-saraf.jpg"},{"rank":9,"name":"Ravi Jain","programmes":"","img":"assets/img/toppers/archive/2019/09-ravi-jain.webp","photo":"assets/img/toppers/2019-9-ravi-jain.jpg"}],"2020":[{"rank":1,"name":"Shubham Kumar","programmes":"","img":"assets/img/toppers/archive/2020/01-shubham-kumar.webp","photo":"assets/img/toppers/2020-1-shubham-kumar.jpg"},{"rank":2,"name":"Jagrati Awasthi","programmes":"","img":"assets/img/toppers/archive/2020/02-jagrati-awasthi.webp","photo":"assets/img/toppers/2020-2-jagrati-awasthi.jpg"},{"rank":3,"name":"Ankita Jain","programmes":"","img":"assets/img/toppers/archive/2020/03-ankita-jain.webp","photo":"assets/img/toppers/2020-3-ankita-jain.jpg"},{"rank":5,"name":"Mamta Yadav","programmes":"","img":"assets/img/toppers/archive/2020/05-mamta-yadav.webp","photo":"assets/img/toppers/2020-5-mamta-yadav.jpg"},{"rank":9,"name":"Apala Mishra","programmes":"","img":"assets/img/toppers/archive/2020/09-apala-mishra.webp","photo":"assets/img/toppers/2020-9-apala-mishra.jpg"},{"rank":10,"name":"Satyam Gandhi","programmes":"","img":"assets/img/toppers/archive/2020/10-satyam-gandhi.webp","photo":"assets/img/toppers/2020-10-satyam-gandhi.jpg"}],"2021":[{"rank":1,"name":"Shruti Sharma","programmes":"","img":"assets/img/toppers/archive/2021/01-shruti-sharma.webp","photo":"assets/img/toppers/2021-1-shruti-sharma.jpg"},{"rank":2,"name":"Ankita Agarwal","programmes":"","img":"assets/img/toppers/archive/2021/02-ankita-agarwal.webp","photo":"assets/img/toppers/2021-2-ankita-agarwal.jpg"},{"rank":3,"name":"Gamini Singla","programmes":"","img":"assets/img/toppers/archive/2021/03-gamini-singla.webp","photo":"assets/img/toppers/2021-3-gamini-singla.jpg"},{"rank":4,"name":"Aishwarya Verma","programmes":"","img":"assets/img/toppers/archive/2021/04-aishwarya-verma.webp","photo":"assets/img/toppers/2021-4-aishwarya-verma.jpg"},{"rank":6,"name":"Yaksh Chaudhary","programmes":"","img":"assets/img/toppers/archive/2021/06-yaksh-chaudhary.webp","photo":"assets/img/toppers/2021-6-yaksh-chaudhary.jpg"},{"rank":7,"name":"Samyak S Jain","programmes":"","img":"assets/img/toppers/archive/2021/07-samyak-s-jain.webp","photo":"assets/img/toppers/2021-7-samyak-s-jain.jpg"},{"rank":9,"name":"Preetam Kumar","programmes":"","img":"assets/img/toppers/archive/2021/09-preetam-kumar.webp","photo":"assets/img/toppers/2021-9-preetam-kumar.jpg"},{"rank":10,"name":"Harkeerat Singh Randhawa","programmes":"","img":"assets/img/toppers/archive/2021/10-harkeerat-singh-randhawa.webp","photo":"assets/img/toppers/2021-10-harkeerat-singh-randhawa.jpg"},{"rank":12,"name":"Yasharth Shekhar","programmes":"","img":"assets/img/toppers/archive/2021/12-yasharth-shekhar.webp","photo":"assets/img/toppers/2021-12-yasharth-shekhar.jpg"},{"rank":14,"name":"Abhinav J Jain - Rank 14","programmes":"","img":"assets/img/toppers/archive/2021/14-abhinav-j-jain-rank-14.webp","photo":"assets/img/toppers/2021-14-abhinav-j-jain-rank-14.jpg"},{"rank":15,"name":"Yaswanth Kumar Reddy","programmes":"","img":"assets/img/toppers/archive/2021/15-yaswanth-kumar-reddy.webp","photo":"assets/img/toppers/2021-15-yaswanth-kumar-reddy.jpg"},{"rank":16,"name":"Anshu Priya","programmes":"","img":"assets/img/toppers/archive/2021/16-anshu-priya.webp","photo":"assets/img/toppers/2021-16-anshu-priya.jpg"},{"rank":20,"name":"Arpit Chauhan","programmes":"","img":"assets/img/toppers/archive/2021/20-arpit-chauhan.webp","photo":"assets/img/toppers/2021-20-arpit-chauhan.jpg"}],"2022":[{"rank":1,"name":"Ishita Kishore","programmes":"","img":"assets/img/toppers/archive/2022/01-ishita-kishore.webp","photo":"assets/img/toppers/2022-1-ishita-kishore.webp"},{"rank":2,"name":"Garima Lohia","programmes":"","img":"assets/img/toppers/archive/2022/02-garima-lohia.webp","photo":"assets/img/toppers/2022-2-garima-lohia.webp"},{"rank":3,"name":"Uma Harathi N","programmes":"","img":"assets/img/toppers/archive/2022/03-uma-harathi-n.webp","photo":"assets/img/toppers/2022-3-uma-harathi-n.webp"},{"rank":4,"name":"Smriti Mishra","programmes":"","img":"assets/img/toppers/archive/2022/04-smriti-mishra.webp","photo":"assets/img/toppers/2022-4-smriti-mishra.webp"},{"rank":5,"name":"Mayur Hazarika","programmes":"","img":"assets/img/toppers/archive/2022/05-mayur-hazarika.webp","photo":"assets/img/toppers/2022-5-mayur-hazarika.webp"},{"rank":9,"name":"Kanika Goyal","programmes":"","img":"assets/img/toppers/archive/2022/09-kanika-goyal.webp","photo":"assets/img/toppers/2022-9-kanika-goyal.webp"},{"rank":10,"name":"Rahul Srivastava","programmes":"","img":"assets/img/toppers/archive/2022/10-rahul-srivastava.webp","photo":"assets/img/toppers/2022-10-rahul-srivastava.webp"},{"rank":12,"name":"Abhinav Siwach","programmes":"","img":"assets/img/toppers/archive/2022/12-abhinav-siwach.webp","photo":"assets/img/toppers/2022-12-abhinav-siwach.webp"},{"rank":13,"name":"Vidushi Singh","programmes":"","img":"assets/img/toppers/archive/2022/13-vidushi-singh.webp","photo":"assets/img/toppers/2022-13-vidushi-singh.webp"},{"rank":14,"name":"Kritika Goyal","programmes":"","img":"assets/img/toppers/archive/2022/14-kritika-goyal.webp","photo":"assets/img/toppers/2022-14-kritika-goyal.webp"},{"rank":15,"name":"Swati Sharma","programmes":"","img":"assets/img/toppers/archive/2022/15-swati-sharma.webp","photo":"assets/img/toppers/2022-15-swati-sharma.webp"},{"rank":16,"name":"Shishir Kumar Singh","programmes":"","img":"assets/img/toppers/archive/2022/16-shishir-kumar-singh.webp","photo":"assets/img/toppers/2022-16-shishir-kumar-singh.webp"},{"rank":18,"name":"Siddharth Shukla","programmes":"","img":"assets/img/toppers/archive/2022/18-siddharth-shukla.webp","photo":"assets/img/toppers/2022-18-siddharth-shukla.webp"},{"rank":19,"name":"Laghima Tiwari","programmes":"","img":"assets/img/toppers/archive/2022/19-laghima-tiwari.webp","photo":"assets/img/toppers/2022-19-laghima-tiwari.webp"},{"rank":20,"name":"Anoushka Sharma","programmes":"","img":"assets/img/toppers/archive/2022/20-anoushka-sharma.webp","photo":"assets/img/toppers/2022-20-anoushka-sharma.webp"}],"2023":[{"rank":1,"name":"Aditya Srivastava","programmes":"IGP","img":"assets/img/toppers/archive/2023/01-aditya-srivastava.webp","photo":"assets/img/toppers/2023-1-aditya-srivastava.webp"},{"rank":2,"name":"Animesh Pradhan","programmes":"IGP","img":"assets/img/toppers/archive/2023/02-animesh-pradhan.webp","photo":"assets/img/toppers/2023-2-animesh-pradhan.webp"},{"rank":3,"name":"Donuru Ananya Reddy","programmes":"IGP","img":"assets/img/toppers/archive/2023/03-donuru-ananya-reddy.webp","photo":"assets/img/toppers/2023-3-donuru-ananya-reddy.webp"},{"rank":5,"name":"Ruhani","programmes":"IGP","img":"assets/img/toppers/archive/2023/05-ruhani.webp","photo":"assets/img/toppers/2023-5-ruhani.webp"},{"rank":6,"name":"Srishti Dabas","programmes":"IGP","img":"assets/img/toppers/archive/2023/06-srishti-dabas.webp","photo":"assets/img/toppers/2023-6-srishti-dabas.webp"},{"rank":8,"name":"Ashish Kumar","programmes":"Sociology & IGP","img":"assets/img/toppers/archive/2023/08-ashish-kumar.webp","photo":"assets/img/toppers/2023-8-ashish-kumar.webp"},{"rank":9,"name":"Nausheen","programmes":"Test Series & IGP","img":"assets/img/toppers/archive/2023/09-nausheen.webp","photo":"assets/img/toppers/2023-9-nausheen.webp"},{"rank":10,"name":"Aishwaryam Prajapati","programmes":"IGP","img":"assets/img/toppers/archive/2023/10-aishwaryam-prajapati.webp","photo":"assets/img/toppers/2023-10-aishwaryam-prajapati.webp"},{"rank":13,"name":"Medha Anand","programmes":"GS Classroom, Sociology, & IGP","img":"assets/img/toppers/archive/2023/13-medha-anand.webp","photo":"assets/img/toppers/2023-13-medha-anand.webp"},{"rank":15,"name":"Kunal Rastogi","programmes":"IGP","img":"assets/img/toppers/archive/2023/15-kunal-rastogi.webp","photo":"assets/img/toppers/2023-15-kunal-rastogi.webp"},{"rank":16,"name":"Ayan Jain","programmes":"IGP","img":"assets/img/toppers/archive/2023/16-ayan-jain.webp","photo":"assets/img/toppers/2023-16-ayan-jain.webp"},{"rank":17,"name":"Swati Sharma","programmes":"Test Series & IGP","img":"assets/img/toppers/archive/2023/17-swati-sharma.webp","photo":"assets/img/toppers/2023-17-swati-sharma.webp"},{"rank":18,"name":"Wardah Khan","programmes":"GS Classroom, Essay, & IGP","img":"assets/img/toppers/archive/2023/18-wardah-khan.webp","photo":"assets/img/toppers/2023-18-wardah-khan.webp"},{"rank":19,"name":"Shivam Kumar","programmes":"IGP","img":"assets/img/toppers/archive/2023/19-shivam-kumar.webp","photo":"assets/img/toppers/2023-19-shivam-kumar.webp"},{"rank":20,"name":"Akash Verma","programmes":"GS Mains Test Series, Public Administration Optional Mains Test Series, & IGP","img":"assets/img/toppers/archive/2023/20-akash-verma.webp","photo":"assets/img/toppers/2023-20-akash-verma.webp"},{"rank":21,"name":"Pururaj Singh Solanki","programmes":"GS Classroom, Essay, & IGP","img":"assets/img/toppers/archive/2023/21-pururaj-singh-solanki.webp","photo":"assets/img/toppers/2023-21-pururaj-singh-solanki.webp"},{"rank":23,"name":"Saurabh Sharma","programmes":"IGP","img":"assets/img/toppers/archive/2023/23-saurabh-sharma.webp","photo":"assets/img/toppers/2023-23-saurabh-sharma.webp"},{"rank":24,"name":"Prajnanandan Giri","programmes":"IGP","img":"assets/img/toppers/archive/2023/24-prajnanandan-giri.webp","photo":"assets/img/toppers/2023-24-prajnanandan-giri.webp"},{"rank":25,"name":"Ritika Verma","programmes":"IGP","img":"assets/img/toppers/archive/2023/25-ritika-verma.webp","photo":"assets/img/toppers/2023-25-ritika-verma.webp"},{"rank":26,"name":"Rupal Rana","programmes":"Political Science & IGP","img":"assets/img/toppers/archive/2023/26-rupal-rana.webp","photo":"assets/img/toppers/2023-26-rupal-rana.webp"},{"rank":27,"name":"Nandala Saikiran","programmes":"IGP","img":"assets/img/toppers/archive/2023/27-nandala-saikiran.webp","photo":"assets/img/toppers/2023-27-nandala-saikiran.webp"},{"rank":28,"name":"Pawan Kumar Goel","programmes":"Sociology, Mains Test Series","img":"assets/img/toppers/archive/2023/28-pawan-kumar-goel.webp","photo":"assets/img/toppers/2023-28-pawan-kumar-goel.webp"},{"rank":29,"name":"Saloni Chhabra","programmes":"GS Classroom & IGP","img":"assets/img/toppers/archive/2023/29-saloni-chhabra.webp","photo":"assets/img/toppers/2023-29-saloni-chhabra.webp"},{"rank":31,"name":"Vishnu Sasikumar","programmes":"IGP","img":"assets/img/toppers/archive/2023/31-vishnu-sasikumar.webp","photo":"assets/img/toppers/2023-31-vishnu-sasikumar.webp"},{"rank":32,"name":"Arjun Gupta","programmes":"IGP","img":"assets/img/toppers/archive/2023/32-arjun-gupta.webp","photo":"assets/img/toppers/2023-32-arjun-gupta.webp"},{"rank":34,"name":"Zufishan Haque","programmes":"GS & Test Series Anthropology","img":"assets/img/toppers/archive/2023/34-zufishan-haque.webp","photo":"assets/img/toppers/2023-34-zufishan-haque.webp"},{"rank":35,"name":"Abhinav Jain","programmes":"IGP","img":"assets/img/toppers/archive/2023/35-abhinav-jain.webp","photo":"assets/img/toppers/2023-35-abhinav-jain.webp"},{"rank":36,"name":"Ayushi Pradhan","programmes":"IGP","img":"assets/img/toppers/archive/2023/36-ayushi-pradhan.webp","photo":"assets/img/toppers/2023-36-ayushi-pradhan.webp"},{"rank":37,"name":"Tejas Agnihotri","programmes":"GS Classroom & IGP","img":"assets/img/toppers/archive/2023/37-tejas-agnihotri.webp","photo":"assets/img/toppers/2023-37-tejas-agnihotri.webp"},{"rank":38,"name":"Animesh Verma","programmes":"IGP","img":"assets/img/toppers/archive/2023/38-animesh-verma.webp","photo":"assets/img/toppers/2023-38-animesh-verma.webp"},{"rank":39,"name":"Deepti Rohilla","programmes":"IGP","img":"assets/img/toppers/archive/2023/39-deepti-rohilla.webp","photo":"assets/img/toppers/2023-39-deepti-rohilla.webp"},{"rank":44,"name":"Akanchha Singh","programmes":"GS Classroom & IGP","img":"assets/img/toppers/archive/2023/44-akanchha-singh.webp","photo":"assets/img/toppers/2023-44-akanchha-singh.webp"},{"rank":45,"name":"Ramya R","programmes":"Test Series & IGP","img":"assets/img/toppers/archive/2023/45-ramya-r.webp","photo":"assets/img/toppers/2023-45-ramya-r.webp"},{"rank":46,"name":"Bhawesh","programmes":"IGP","img":"assets/img/toppers/archive/2023/46-bhawesh.webp","photo":"assets/img/toppers/2023-46-bhawesh.webp"},{"rank":47,"name":"Basant Singh","programmes":"GS Classroom & IGP","img":"assets/img/toppers/archive/2023/47-basant-singh.webp","photo":"assets/img/toppers/2023-47-basant-singh.webp"},{"rank":48,"name":"Anshul Hindal","programmes":"IGP","img":"assets/img/toppers/archive/2023/48-anshul-hindal.webp","photo":"assets/img/toppers/2023-48-anshul-hindal.webp"},{"rank":50,"name":"K N Chandana Jahnavi","programmes":"Test Series & IGP","img":"assets/img/toppers/archive/2023/50-k-n-chandana-jahnavi.webp","photo":"assets/img/toppers/2023-50-k-n-chandana-jahnavi.webp"}],"2024":[{"rank":1,"name":"Shakti Dubey","programmes":"General Studies PCM 10 Months, Sure Shot Mains Test Series, Power Up Prelims Test Series, Smart Current Affairs","img":"assets/img/toppers/archive/2024/01-shakti-dubey.webp","photo":"assets/img/toppers/2024-1-shakti-dubey.webp"},{"rank":2,"name":"Harshita Goyal","programmes":"Powerup Prelims Test Series, Interview Guidance Program","img":"assets/img/toppers/archive/2024/02-harshita-goyal.webp","photo":"assets/img/toppers/2024-2-harshita-goyal.webp"},{"rank":3,"name":"Dongre Archit Parag","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/03-dongre-archit-parag.webp","photo":"assets/img/toppers/2024-3-dongre-archit-parag.webp"},{"rank":4,"name":"Shah Margi Chirag","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/04-shah-margi-chirag.webp","photo":"assets/img/toppers/2024-4-shah-margi-chirag.webp"},{"rank":5,"name":"Aakash Garg","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/05-aakash-garg.webp","photo":"assets/img/toppers/2024-5-aakash-garg.webp"},{"rank":6,"name":"Komal Punia`","programmes":"General Studies PCM 10 Months, Sure Shot Mains Test Series, SMART Current Affairs, Essay Module","img":"assets/img/toppers/archive/2024/06-komal-punia.webp","photo":"assets/img/toppers/2024-6-komal-punia.webp"},{"rank":7,"name":".Aayushi Bansal","programmes":"General Studies PCM 10 Months, Optional Sociology, Ethics Module, Sociology Mains Test Series","img":"assets/img/toppers/archive/2024/07-aayushi-bansal.webp","photo":"assets/img/toppers/2024-7-aayushi-bansal.webp"},{"rank":10,"name":"Mayank Tripathi","programmes":"General Studies PCM 10 Months","img":"assets/img/toppers/archive/2024/10-mayank-tripathi.webp","photo":"assets/img/toppers/2024-10-mayank-tripathi.webp"},{"rank":12,"name":"Ashi Sharma","programmes":"General Studies PCM 10 Months, Optional Public Administration, Step Up Mentorship","img":"assets/img/toppers/archive/2024/12-ashi-sharma.webp","photo":"assets/img/toppers/2024-12-ashi-sharma.webp"},{"rank":14,"name":"Abhishek Vashishtha","programmes":"General Studies PCM 10 Months","img":"assets/img/toppers/archive/2024/14-abhishek-vashishtha.webp","photo":"assets/img/toppers/2024-14-abhishek-vashishtha.webp"},{"rank":15,"name":"Banna Venkatesh","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/15-banna-venkatesh.webp","photo":"assets/img/toppers/2024-15-banna-venkatesh.webp"},{"rank":16,"name":"Madhav Agarwal","programmes":"Commerce Mains Test Series, Ethics Module","img":"assets/img/toppers/archive/2024/16-madhav-agarwal.webp","photo":"assets/img/toppers/2024-16-madhav-agarwal.webp"},{"rank":17,"name":"Sanskriti Trivedy","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/17-sanskriti-trivedy.webp","photo":"assets/img/toppers/2024-17-sanskriti-trivedy.webp"},{"rank":18,"name":"Saumya Mishra","programmes":"General Studies PCM 10 Months","img":"assets/img/toppers/archive/2024/18-saumya-mishra.webp","photo":"assets/img/toppers/2024-18-saumya-mishra.webp"},{"rank":19,"name":"Vibhor Bhardwaj","programmes":"General Studies PCM 10 Months, Ethics Module","img":"assets/img/toppers/archive/2024/19-vibhor-bhardwaj.webp","photo":"assets/img/toppers/2024-19-vibhor-bhardwaj.webp"},{"rank":21,"name":"Divyank Gupta","programmes":"","img":"assets/img/toppers/archive/2024/21-divyank-gupta.webp","photo":"assets/img/toppers/2024-21-divyank-gupta.webp"},{"rank":22,"name":"Riya Saini.","programmes":"Interview Guidance Program, PowerUp Prelims Test Series","img":"assets/img/toppers/archive/2024/22-riya-saini.webp","photo":"assets/img/toppers/2024-22-riya-saini.webp"},{"rank":23,"name":"B Sivachandran","programmes":"Commerce Mains Test Series","img":"assets/img/toppers/archive/2024/23-b-sivachandran.webp","photo":"assets/img/toppers/2024-23-b-sivachandran.webp"},{"rank":24,"name":"R Rangamanju","programmes":"Ethics Module 2024, Interview Guidance Program","img":"assets/img/toppers/archive/2024/24-r-rangamanju.webp","photo":"assets/img/toppers/2024-24-r-rangamanju.webp"},{"rank":26,"name":"Shivansh Subhash Jagade","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/26-shivansh-subhash-jagade.webp","photo":"assets/img/toppers/2024-26-shivansh-subhash-jagade.webp"},{"rank":30,"name":"Panchal Smit Hasmukhbhai","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/30-panchal-smit-hasmukhbhai.webp","photo":"assets/img/toppers/2024-30-panchal-smit-hasmukhbhai.webp"},{"rank":31,"name":"Shreya Tyagi","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/31-shreya-tyagi.webp","photo":"assets/img/toppers/2024-31-shreya-tyagi.webp"},{"rank":32,"name":"'Utkarsh Yadav","programmes":"General Studies PCM 10 Months, Essay Module Course, Mains Test Series, Prelims Test Series","img":"assets/img/toppers/archive/2024/32-utkarsh-yadav.webp","photo":"assets/img/toppers/2024-32-utkarsh-yadav.webp"},{"rank":33,"name":"Alfred Thomas","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/33-alfred-thomas.webp","photo":"assets/img/toppers/2024-33-alfred-thomas.webp"},{"rank":34,"name":"Abhi Jain","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/34-abhi-jain.webp","photo":"assets/img/toppers/2024-34-abhi-jain.webp"},{"rank":35,"name":"Shreyak Garg","programmes":"Essay Test Series, Ethics Module, Essay Module, Interview Guidance Program","img":"assets/img/toppers/archive/2024/35-shreyak-garg.webp","photo":"assets/img/toppers/2024-35-shreyak-garg.webp"},{"rank":36,"name":"Muskan Srivastava","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/36-muskan-srivastava.webp","photo":"assets/img/toppers/2024-36-muskan-srivastava.webp"},{"rank":37,"name":"Shobhika Pathak","programmes":"Sure Shot Mains Test Series, Online Prelims Test Series, Interview Guidance Program","img":"assets/img/toppers/archive/2024/37-shobhika-pathak.webp","photo":"assets/img/toppers/2024-37-shobhika-pathak.webp"},{"rank":39,"name":"Monica R","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/39-monica-r.webp","photo":"assets/img/toppers/2024-39-monica-r.webp"},{"rank":40,"name":"Iram Choudhary","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/40-iram-choudhary.webp","photo":"assets/img/toppers/2024-40-iram-choudhary.webp"},{"rank":41,"name":"Sachin Basavaraj Guttur","programmes":"General Studies PCM 10 Months","img":"assets/img/toppers/archive/2024/41-sachin-basavaraj-guttur.webp","photo":"assets/img/toppers/2024-41-sachin-basavaraj-guttur.webp"},{"rank":42,"name":"Pavithra P","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/42-pavithra-p.webp","photo":"assets/img/toppers/2024-42-pavithra-p.webp"},{"rank":43,"name":"Avdhija Gupta","programmes":"Prelims Test Series","img":"assets/img/toppers/archive/2024/43-avdhija-gupta.webp","photo":"assets/img/toppers/2024-43-avdhija-gupta.webp"},{"rank":46,"name":"Ravula Jayasimha Reddy","programmes":"Ethics Module","img":"assets/img/toppers/archive/2024/46-ravula-jayasimha-reddy.webp","photo":"assets/img/toppers/2024-46-ravula-jayasimha-reddy.webp"},{"rank":47,"name":"NANDANAA G P","programmes":"Ethics Module, Interview Guidance Program","img":"assets/img/toppers/archive/2024/47-nandanaa-g-p.webp","photo":"assets/img/toppers/2024-47-nandanaa-g-p.webp"},{"rank":48,"name":"Ritika Rath","programmes":"Prelims Test Series, Interview Guidance Program","img":"assets/img/toppers/archive/2024/48-ritika-rath.webp","photo":"assets/img/toppers/2024-48-ritika-rath.webp"},{"rank":49,"name":"Sourav Sinha","programmes":"Interview Guidance Program","img":"assets/img/toppers/archive/2024/49-sourav-sinha.webp","photo":"assets/img/toppers/2024-49-sourav-sinha.webp"},{"rank":50,"name":"Ankur Tripathi","programmes":"General Studies PCM 10 Months, Interview Guidance Program","img":"assets/img/toppers/archive/2024/50-ankur-tripathi.webp","photo":"assets/img/toppers/2024-50-ankur-tripathi.webp"}],"2025":[{"rank":1,"name":"Anuj Agnihotri","programmes":"IGP","img":"assets/img/toppers/archive/2025/01-anuj-agnihotri.webp","photo":"assets/img/toppers/portrait/2025/01-anuj-agnihotri.webp"},{"rank":2,"name":"Rajeshwari Suve M","programmes":"PowerUp Prelims Test Series, IGP, Mains 2020 Test Series","img":"assets/img/toppers/archive/2025/02-rajeshwari-suve-m.webp","photo":"assets/img/toppers/portrait/2025/02-rajeshwari-suve-m.webp"},{"rank":3,"name":"Akansh Dhull","programmes":"General Studies Prelims Cum Mains Classroom Programme","img":"assets/img/toppers/archive/2025/03-akansh-dhull.webp","photo":"assets/img/toppers/portrait/2025/03-akansh-dhull.webp"},{"rank":4,"name":"Raghav Jhunjhunwala","programmes":"IGP","img":"assets/img/toppers/archive/2025/04-raghav-jhunjhunwala.webp","photo":"assets/img/toppers/portrait/2025/04-raghav-jhunjhunwala.webp"},{"rank":5,"name":"Ishan Bhatnagar","programmes":"","img":"assets/img/toppers/archive/2025/05-ishan-bhatnagar.webp","photo":"assets/img/toppers/portrait/2025/05-ishan-bhatnagar.webp"},{"rank":6,"name":"Zinnia Aurora","programmes":"GS Ethics Module, IGP, Power Up 23 Combined Test Series for Prelims 2023","img":"assets/img/toppers/archive/2025/06-zinnia-aurora.webp","photo":"assets/img/toppers/portrait/2025/06-zinnia-aurora.webp"},{"rank":7,"name":"A R Rajah Mohaideen","programmes":"IGP","img":"assets/img/toppers/archive/2025/07-a-r-rajah-mohaideen.webp","photo":"assets/img/toppers/portrait/2025/07-a-r-rajah-mohaideen.webp"},{"rank":8,"name":"Pakshal Secretry","programmes":"Mains Camp, IGP","img":"assets/img/toppers/archive/2025/08-pakshal-secretry.webp","photo":"assets/img/toppers/portrait/2025/08-pakshal-secretry.webp"},{"rank":9,"name":"Astha Jain","programmes":"IGP","img":"assets/img/toppers/archive/2025/09-astha-jain.webp","photo":"assets/img/toppers/portrait/2025/09-astha-jain.webp"},{"rank":10,"name":"Ujjwal Priyank","programmes":"IGP","img":"assets/img/toppers/archive/2025/10-ujjwal-priyank.webp","photo":"assets/img/toppers/portrait/2025/10-ujjwal-priyank.webp"},{"rank":11,"name":"Yashaswi Raj Vardhan","programmes":"IGP","img":"assets/img/toppers/archive/2025/11-yashaswi-raj-vardhan.webp","photo":"assets/img/toppers/2025-11-yashaswi-raj-vardhan.webp"},{"rank":12,"name":"Akshit Bhardwaj","programmes":"Prelims CAMP, General Studies, IGP","img":"assets/img/toppers/archive/2025/12-akshit-bhardwaj.webp","photo":"assets/img/toppers/2025-12-akshit-bhardwaj.webp"},{"rank":13,"name":"Ananya Sharma","programmes":"IGP","img":"assets/img/toppers/archive/2025/13-ananya-sharma.webp","photo":"assets/img/toppers/2025-13-ananya-sharma.webp"},{"rank":14,"name":"Surabhi Yadav","programmes":"Ethics Answer Writing Prog. & IGP","img":"assets/img/toppers/archive/2025/14-surabhi-yadav.webp","photo":"assets/img/toppers/2025-14-surabhi-yadav.webp"},{"rank":15,"name":"Simrandeep Kaur","programmes":"IGP","img":"assets/img/toppers/archive/2025/15-simrandeep-kaur.webp","photo":"assets/img/toppers/2025-15-simrandeep-kaur.webp"},{"rank":16,"name":"Monika Srivastava","programmes":"GS Ethics Module, Sure Shot Mains - FLT-A2, Essay Module, SMART Current Affairs Programme","img":"assets/img/toppers/archive/2025/16-monika-srivastava.webp","photo":"assets/img/toppers/2025-16-monika-srivastava.webp"},{"rank":18,"name":"Sruthii R","programmes":"General Studies, Sociology Optional","img":"assets/img/toppers/archive/2025/18-sruthii-r.webp","photo":"assets/img/toppers/2025-18-sruthii-r.webp"},{"rank":19,"name":"Nisar Dishant Amrutlal","programmes":"IGP","img":"assets/img/toppers/archive/2025/19-nisar-dishant-amrutlal.webp","photo":"assets/img/toppers/2025-19-nisar-dishant-amrutlal.webp"},{"rank":21,"name":"Shubham Singh","programmes":"Ethics Answer Writing Program, Ethics Module Course","img":"assets/img/toppers/archive/2025/21-shubham-singh.webp","photo":"assets/img/toppers/2025-21-shubham-singh.webp"},{"rank":22,"name":"Geetika Arora","programmes":"General Studies","img":"assets/img/toppers/archive/2025/22-geetika-arora.webp","photo":"assets/img/toppers/2025-22-geetika-arora.webp"},{"rank":23,"name":"Jeenu Sri Jaswanth Chandra","programmes":"IGP","img":"assets/img/toppers/archive/2025/23-jeenu-sri-jaswanth-chandra.webp","photo":"assets/img/toppers/2025-23-jeenu-sri-jaswanth-chandra.webp"},{"rank":25,"name":"Bhavika Chopra","programmes":"IGP","img":"assets/img/toppers/archive/2025/25-bhavika-chopra.webp","photo":"assets/img/toppers/2025-25-bhavika-chopra.webp"},{"rank":27,"name":"Vikas","programmes":"IGS Ethics Module, IGP, SMART Current Affairs Programme, PSIR Optional Mains Test Series-A2, Essay Module, Sure Shot Mains - FLT-A2","img":"assets/img/toppers/archive/2025/27-vikas.webp","photo":"assets/img/toppers/2025-27-vikas.webp"},{"rank":31,"name":"Aryan Yadav","programmes":"PowerUp Prelims Test Series 2024: Offline & Online","img":"assets/img/toppers/archive/2025/31-aryan-yadav.webp","photo":"assets/img/toppers/2025-31-aryan-yadav.webp"},{"rank":33,"name":"Mayank Purohit","programmes":"Ethics Answer Writing Programme","img":"assets/img/toppers/archive/2025/33-mayank-purohit.webp","photo":"assets/img/toppers/2025-33-mayank-purohit.webp"},{"rank":34,"name":"Nancy Singh","programmes":"IGP","img":"assets/img/toppers/archive/2025/34-nancy-singh.webp","photo":"assets/img/toppers/2025-34-nancy-singh.webp"},{"rank":35,"name":"Vaibhavi Agrawal","programmes":"PowerUp Prelims Test Series 2024, GS Ethics Module, Essay Module, General Studies, Mathematics Enrichment Course, VTS Upgrade Mains Test Series, Mathematics Mains Test Series, Online PowerUP Prelims Programme","img":"assets/img/toppers/archive/2025/35-vaibhavi-agrawal.webp","photo":"assets/img/toppers/2025-35-vaibhavi-agrawal.webp"},{"rank":36,"name":"Deepali Mahto","programmes":"IGP","img":"assets/img/toppers/archive/2025/36-deepali-mahto.webp","photo":"assets/img/toppers/2025-36-deepali-mahto.webp"},{"rank":37,"name":"Sakshi Jain","programmes":"IGP","img":"assets/img/toppers/archive/2025/37-sakshi-jain.webp","photo":"assets/img/toppers/2025-37-sakshi-jain.webp"},{"rank":38,"name":"Deepanshu Jindal","programmes":"IGP, Ethics Answer Writing Programme","img":"assets/img/toppers/archive/2025/38-deepanshu-jindal.webp","photo":"assets/img/toppers/2025-38-deepanshu-jindal.webp"},{"rank":40,"name":"Diksha Rai","programmes":"IGP","img":"assets/img/toppers/archive/2025/40-diksha-rai.webp","photo":"assets/img/toppers/2025-40-diksha-rai.webp"},{"rank":41,"name":"Sudipa Dutta","programmes":"IGP","img":"assets/img/toppers/archive/2025/41-sudipa-dutta.webp","photo":"assets/img/toppers/2025-41-sudipa-dutta.webp"},{"rank":43,"name":"Rupal Jaiswal","programmes":"IGP","img":"assets/img/toppers/archive/2025/43-rupal-jaiswal.webp","photo":"assets/img/toppers/2025-43-rupal-jaiswal.webp"},{"rank":44,"name":"Deeksha Chourasiya","programmes":"Essay Module, History Enrichment Course, History Mains Test Series, IGP","img":"assets/img/toppers/archive/2025/44-deeksha-chourasiya.webp","photo":"assets/img/toppers/2025-44-deeksha-chourasiya.webp"},{"rank":46,"name":"Shambhavi Tiwari","programmes":"IGP","img":"assets/img/toppers/archive/2025/46-shambhavi-tiwari.webp","photo":"assets/img/toppers/2025-46-shambhavi-tiwari.webp"},{"rank":48,"name":"Aniket Ranjan","programmes":"Ethics Module Course, Ethics Answer Writing Programme","img":"assets/img/toppers/archive/2025/48-aniket-ranjan.webp","photo":"assets/img/toppers/2025-48-aniket-ranjan.webp"}]}};

const RANKED = TOPPERS.filter(p => p.r).map(p => ({ ...p, n: p.n.replace(/\b[a-z]/g, c => c.toUpperCase()) }));
export const YEARS = [...new Set(RANKED.map(p => p.y))].sort((a, b) => b - a);
export const byYear = y => RANKED.filter(p => p.y === y).sort((a, b) => a.r - b.r);
const latest = byYear(YEARS[0]);
export const top10 = latest.filter(p => p.r <= 10);
export const progOf = p => p.c ? esc(p.c) : 'Prepared with Vajiram &amp; Ravi';

const progLine = rank => {
  const p = TOPPERS_2025.find(t => t.rank === rank)?.programmes || [];
  return p.slice(0, 2).join(' · ') + (p.length > 2 ? ` +${p.length - 2} more` : '');
};
export default function Toppers() {
  return (
    <>
      <Stylesheet href="/css/podium.css" />
      <section className="pd" id="toppers" aria-labelledby="pdH">
  
  
  <svg className="pd__defs" width="0" height="0" aria-hidden="true" focusable="false">
    <clipPath id="pdPhoto" clipPathUnits="objectBoundingBox">
      <path d="M-.4 -.4H1.4V.07054H.95555V.61698C.95555 .68779 .77906 .84233 .49904 .94408C.21903 .84233 .04445 .68779 .04445 .61698V.07054H-.4Z"/>
    </clipPath>
    <clipPath id="pdPhotoTall" clipPathUnits="objectBoundingBox">
      <path d="M-.4 0H1.4V.33610H.95555V.72641C.95555 .77699 .77906 .88738 .49904 .96006C.21903 .88738 .04445 .77699 .04445 .72641V.33610H-.4Z"/>
    </clipPath>
  </svg>
  <div className="pd__hd">
    <SectionLabel>UPSC CSE 2025 results</SectionLabel>
    <h2 id="pdH" className="h2 h2--sec pd__h">Ranks they earned, <em>with the guidance we&nbsp;gave.</em></h2>
  </div>

  
  

  
  <div className="dr" role="region" aria-label="More UPSC CSE 2025 rank holders">
    <p className="dr__h"><span id="drHead"> 36/50 Ranks, UPSC CSE 2025</span></p>
    
    
    <Tabs
      className="dr__bar"
      hidden
      id="drTabs"
      label="Year of the examination"
      controls="drList"
      items={DR_YEARS.map((y, i) => ({ id: String(y), label: y, domId: `drTab${y}`, hidden: i > 4, className: i > 4 ? 'dr__tab--old' : undefined }))}
    >
      <button type="button" className="dr__all" aria-controls="drTabs" aria-expanded="false"><span className="dr__all-t">View all</span></button>
    </Tabs>
    <div className="dr__view" id="drList" aria-labelledby="drHead">
      <ul className="dr__track">
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/01-anuj-agnihotri-460.webp" srcSet="/assets/img/toppers/portrait/2025/01-anuj-agnihotri-460.webp 460w, /assets/img/toppers/portrait/2025/01-anuj-agnihotri.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Anuj Agnihotri" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 1</p>
          <h4 className="dr__name">Anuj Agnihotri<span className="pd__vh">, All India Rank 1</span></h4>
          <p className="dr__prog">{progLine(1)}</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/02-rajeshwari-suve-m-460.webp" srcSet="/assets/img/toppers/portrait/2025/02-rajeshwari-suve-m-460.webp 460w, /assets/img/toppers/portrait/2025/02-rajeshwari-suve-m.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Rajeshwari Suve M" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 2</p>
          <h4 className="dr__name">Rajeshwari Suve M<span className="pd__vh">, All India Rank 2</span></h4>
          <p className="dr__prog">{progLine(2)}</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/03-akansh-dhull-460.webp" srcSet="/assets/img/toppers/portrait/2025/03-akansh-dhull-460.webp 460w, /assets/img/toppers/portrait/2025/03-akansh-dhull.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Akansh Dhull" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 3</p>
          <h4 className="dr__name">Akansh Dhull<span className="pd__vh">, All India Rank 3</span></h4>
          <p className="dr__prog">{progLine(3)}</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/04-raghav-jhunjhunwala-460.webp" srcSet="/assets/img/toppers/portrait/2025/04-raghav-jhunjhunwala-460.webp 460w, /assets/img/toppers/portrait/2025/04-raghav-jhunjhunwala.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Raghav Jhunjhunwala" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 4</p>
          <h4 className="dr__name">Raghav Jhunjhunwala<span className="pd__vh">, All India Rank 4</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/05-ishan-bhatnagar-460.webp" srcSet="/assets/img/toppers/portrait/2025/05-ishan-bhatnagar-460.webp 460w, /assets/img/toppers/portrait/2025/05-ishan-bhatnagar.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Ishan Bhatnagar" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 5</p>
          <h4 className="dr__name">Ishan Bhatnagar<span className="pd__vh">, All India Rank 5</span></h4>
          <p className="dr__prog">Sociology Optional Crash Course&nbsp;&middot; Sociology Enrichment Course +2 more</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/06-zinnia-aurora-460.webp" srcSet="/assets/img/toppers/portrait/2025/06-zinnia-aurora-460.webp 460w, /assets/img/toppers/portrait/2025/06-zinnia-aurora.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Zinnia Aurora" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 6</p>
          <h4 className="dr__name">Zinnia Aurora<span className="pd__vh">, All India Rank 6</span></h4>
          <p className="dr__prog">GS Ethics Module&nbsp;&middot; Interview Guidance Programme +1 more</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/07-a-r-rajah-mohaideen-460.webp" srcSet="/assets/img/toppers/portrait/2025/07-a-r-rajah-mohaideen-460.webp 460w, /assets/img/toppers/portrait/2025/07-a-r-rajah-mohaideen.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="A R Rajah Mohaideen" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 7</p>
          <h4 className="dr__name">A R Rajah Mohaideen<span className="pd__vh">, All India Rank 7</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/08-pakshal-secretry-460.webp" srcSet="/assets/img/toppers/portrait/2025/08-pakshal-secretry-460.webp 460w, /assets/img/toppers/portrait/2025/08-pakshal-secretry.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Pakshal Secretry" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 8</p>
          <h4 className="dr__name">Pakshal Secretry<span className="pd__vh">, All India Rank 8</span></h4>
          <p className="dr__prog">Mains Camp&nbsp;&middot; Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/09-astha-jain-460.webp" srcSet="/assets/img/toppers/portrait/2025/09-astha-jain-460.webp 460w, /assets/img/toppers/portrait/2025/09-astha-jain.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Astha Jain" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 9</p>
          <h4 className="dr__name">Astha Jain<span className="pd__vh">, All India Rank 9</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/10-ujjwal-priyank-460.webp" srcSet="/assets/img/toppers/portrait/2025/10-ujjwal-priyank-460.webp 460w, /assets/img/toppers/portrait/2025/10-ujjwal-priyank.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Ujjwal Priyank" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 10</p>
          <h4 className="dr__name">Ujjwal Priyank<span className="pd__vh">, All India Rank 10</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 11</p>
          <h4 className="dr__name">Yashaswi Raj Vardhan<span className="pd__vh">, All India Rank 11</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 12</p>
          <h4 className="dr__name">Akshit Bhardwaj<span className="pd__vh">, All India Rank 12</span></h4>
          <p className="dr__prog">Prelims CAMP&nbsp;&middot; General Studies +1 more</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 13</p>
          <h4 className="dr__name">Ananya Sharma<span className="pd__vh">, All India Rank 13</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 14</p>
          <h4 className="dr__name">Surabhi Yadav<span className="pd__vh">, All India Rank 14</span></h4>
          <p className="dr__prog">Ethics Answer Writing Prog.&nbsp;&middot; Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 15</p>
          <h4 className="dr__name">Simrandeep Kaur<span className="pd__vh">, All India Rank 15</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 16</p>
          <h4 className="dr__name">Monika Srivastava<span className="pd__vh">, All India Rank 16</span></h4>
          <p className="dr__prog">GS Ethics Module&nbsp;&middot; Sure Shot Mains - FLT-A2 +2 more</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 18</p>
          <h4 className="dr__name">Sruthii R<span className="pd__vh">, All India Rank 18</span></h4>
          <p className="dr__prog">General Studies&nbsp;&middot; Sociology Optional</p>
        </li>
      </ul>
    </div>
    <ToppersRecord />
    <p className="dr__cta"><Button variant="secondary" onDark href="https://vajiramandravi.com/ias-selections-from-vajiram/" target="_blank" rel="noopener" iconEnd="arrow">View all toppers</Button></p>
  </div>

</section>
    </>
  );
}

const LATEST = NP_ARCHIVE.ARCHIVE_YEARS[0];
const tidyProg = p => p.replace(/^&\s*/, '').trim()
  .replace(/^IGP$/i, 'Interview Guidance Programme').replace(/\bIGP\b/g, 'Interview Guidance Programme')
  .replace(/Interview Guidance Program\b/gi, 'Interview Guidance Programme').replace(/Prelims Cum Mains/g, 'Prelims-cum-Mains');
const prog = s => {
  const P = (s || '').split(/,(?![^(]*\))|\s&\s/).map(tidyProg).filter(Boolean);
  return P.slice(0, 2).join(' · ') + (P.length > 2 ? ` +${P.length - 2} more` : '');
};
const PROG = new Map(TOPPERS.filter(p => p.c).map(p => [`${p.y}-${p.r}`, p.c]));
const PLACEHOLDER = '/assets/img/toppers/portrait/placeholder-man-pad.webp';
const RECORD = NP_ARCHIVE.ARCHIVE_YEARS.filter(y => y < LATEST).map(y => ({
  y,
  people: [...NP_ARCHIVE.ARCHIVE[y]].sort((a, b) => a.rank - b.rank).map(p => ({ r: p.rank, n: p.name, c: prog(p.programmes || PROG.get(`${y}-${p.rank}`)), src: PLACEHOLDER })),
}));
const FIRST = RECORD[0].people[0];
const isCutout = src => src.includes('/portrait/2025/') || src.includes('/portrait/placeholder');
const isPlaceholder = src => src.includes('/portrait/placeholder');

const RECORD_BOX = [
  'cu:relative cu:max-w-[1240px] cu:mx-auto cu:pt-[34px] cu:px-[40px] cu:pb-[30px] cu:max-[600px]:pt-[30px] cu:max-[600px]:px-[20px] cu:max-[600px]:pb-[26px]',
  'cu:text-(--ink)',
].join(' ');

const ROW = [
  'tp-row cu:group cu:relative cu:cursor-pointer cu:focus-visible:[outline:2px_solid_var(--brand)] cu:focus-visible:[outline-offset:-2px] cu:flex cu:items-center cu:gap-[12px] cu:w-full cu:py-[10px] cu:px-[14px] cu:max-[900px]:px-[10px]',
  'cu:rounded-[10px] cu:text-left cu:text-(--ink)',
  'cu:transition-[background-color] cu:duration-200 cu:fine:hover:bg-[#F7F0E6]',
  'cu:motion-reduce:transition-none',
].join(' ');

function ToppersRecord() {
  return (
    <div className="tp-record rv cu:mt-[clamp(40px,4vw,56px)] cu:mb-0 cu:px-(--px) cu:text-left cu:text-(--ink)">
      <div className={RECORD_BOX}>
        <div className="cu:flex cu:flex-col cu:items-center cu:text-center cu:gap-[20px] cu:pb-[clamp(10px,1.2vw,14px)]">
          <div className="cu:min-w-0">
            <h3 className="cu:m-0 cu:[font-family:var(--f-title)] cu:font-normal cu:text-[44px] cu:max-[900px]:text-[clamp(34px,6.4vw,44px)] cu:max-[560px]:text-[32px] cu:leading-[1.1] cu:tracking-[-.02em] cu:text-(--ink) cu:text-balance cu:max-w-[24ch]">For a decade, we’ve been shaping India’s civil servants.</h3>
          </div>
          <Tabs className="tp-yrs cu:self-center" label="Year of the examination" controls="tpList" items={RECORD.map(g => ({ id: String(g.y), label: g.y }))} />
        </div>
        <div className="tp-frame cu:relative cu:mt-[clamp(10px,1.2vw,14px)] cu:p-[clamp(32px,3.2vw,46px)] cu:rounded-(--r-form) cu:before:absolute cu:before:inset-[12px] cu:before:top-[calc(clamp(32px,3.2vw,46px)+38px)] cu:before:pointer-events-none cu:before:border-2 cu:before:border-t-0 cu:before:border-solid cu:before:border-[rgba(194,65,12,.55)] cu:before:[mask-image:linear-gradient(180deg,transparent,#000_45%)]">
          <p className="dr__h"><span data-year-head>{`${RECORD[0].people.length} Ranks, UPSC CSE ${RECORD[0].y}`}</span></p>
          <div className="cu:grid cu:grid-cols-[minmax(0,300px)_minmax(0,1fr)] cu:max-[1100px]:grid-cols-[minmax(0,270px)_minmax(0,1fr)] cu:max-[900px]:grid-cols-1 cu:gap-[clamp(20px,3vw,40px)] cu:items-start cu:mt-[clamp(10px,1.2vw,14px)] cu:[--col:clamp(340px,calc(100svh_-_260px),700px)]">
            <div id="tpList" data-lenis-prevent className="tp-list cu:max-h-(--col) cu:overflow-y-auto cu:-ml-[6px] cu:pl-[6px] cu:pr-[10px] cu:[mask-image:linear-gradient(180deg,#000_90%,transparent)]">
              {RECORD.map((g, gi) => (
                <ul key={g.y} data-y={g.y} hidden={gi !== 0} className="cu:m-0 cu:p-0 cu:list-none cu:grid cu:gap-0">
                  {g.people.map(p => (
                    <li key={p.r + p.n} className="cu:[border-bottom:1px_solid_rgba(120,80,40,.16)] cu:last:[border-bottom:0]">
                      <div className={ROW} role="button" tabIndex={0} data-src={p.src} data-n={p.n} data-r={p.r} data-c={p.c || `UPSC CSE ${g.y}`}>
                        <img src={p.src} alt="" width="40" height="40" loading="lazy" decoding="async" className="cu:hidden cu:max-[900px]:block cu:shrink-0 cu:size-[40px] cu:rounded-full cu:object-cover cu:object-top cu:bg-[#F4EDE3] cu:[box-shadow:0_0_0_2px_rgba(194,65,12,.35)]" />
                        <b className="cu:block cu:min-w-0 cu:[font:600_clamp(16px,1.3vw,18px)/1.3_var(--f)] cu:text-(--ink)">{p.n}</b>
                        <span className="tab__n tp-badge cu:shrink-0 cu:whitespace-nowrap" aria-label={`All India Rank ${p.r}`}>AIR {p.r}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div className="tp-pane cu:[--shield:min(350px,calc((var(--col)-150px)*.88))] cu:max-[1100px]:[--shield:min(290px,calc((var(--col)-150px)*.88))] cu:sticky cu:top-[calc(var(--hdr-h)+16px)] cu:h-(--col) cu:flex cu:items-center cu:justify-center cu:gap-[clamp(20px,2.4vw,36px)] cu:text-left cu:text-(--ink) cu:max-[900px]:hidden" aria-live="polite">
              <div className="dr__fig cu:mt-[28px]" style={{ '--dw': 'var(--shield)', '--dh': 'calc(var(--shield) * 1.24089)' }}>
                <span className="tp-laurel" aria-hidden="true" />
                <span className="dr__gem" aria-hidden="true" />
                <span className="dr__pic">
                  <img data-shot src={FIRST.src} alt={FIRST.n} loading="lazy" decoding="async" className={`tp-shot${isPlaceholder(FIRST.src) ? ' is-pad' : isCutout(FIRST.src) ? '' : ' is-boxed'}`} />
                  <img data-shot-back src={FIRST.src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="tp-shot is-back" />
                </span>
              </div>
              <div data-meta className="tp-meta cu:flex cu:flex-col cu:items-start cu:flex-none cu:w-[230px] cu:h-[190px] cu:justify-start">
                <p className="dr__n" aria-hidden="true"><small>AIR</small> <span data-rank>{FIRST.r}</span></p>
                <h4 data-name className="dr__name">{FIRST.n}</h4>
                <p data-cap className="dr__prog">{FIRST.c || `UPSC CSE ${RECORD[0].y}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function initToppersRecord() {
  const rec = $('#toppers .tp-record');
  if (!rec) return;
  const list = $('.tp-list', rec), pane = $('.tp-pane', rec);
  const name = $('[data-name]', pane), cap = $('[data-cap]', pane), rank = $('[data-rank]', pane), meta = $('[data-meta]', pane);
  let front = $('[data-shot]', pane), back = $('[data-shot-back]', pane);
  let cur = null, token = 0;
  const bar = document.createElement('i');
  bar.className = 'tp-prog'; bar.setAttribute('aria-hidden', 'true'); bar.innerHTML = '<b></b>';
  const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
  const preload = src => { const img = new Image(); img.src = src; return img.decode ? img.decode().catch(() => {}) : new Promise(r => { img.onload = img.onerror = r; }); };
  const show = (row, instant) => {
    if (!row || row === cur) return;
    if (cur) cur.removeAttribute('aria-current');
    cur = row; row.setAttribute('aria-current', 'true'); row.appendChild(bar);
    const mine = ++token, src = row.dataset.src;
    const text = () => { name.textContent = row.dataset.n; cap.textContent = row.dataset.c; rank.textContent = row.dataset.r; };
    if (instant) { text(); return; }
    meta.classList.add('is-swap');
    const photo = front.getAttribute('src') === src ? Promise.resolve() : preload(src);
    Promise.all([photo, wait(220)]).then(() => {
      if (mine !== token) return;
      text();
      if (front.getAttribute('src') !== src) {
        back.src = src; back.alt = row.dataset.n; back.classList.toggle('is-boxed', !isCutout(src)); back.classList.toggle('is-pad', isPlaceholder(src));
        back.classList.remove('is-back'); front.classList.add('is-back');
        front.removeAttribute('alt'); [front, back] = [back, front];
      }
      meta.classList.remove('is-swap');
    });
  };
  list.addEventListener('click', e => show(e.target.closest('.tp-row')));
  list.addEventListener('keydown', e => { if (e.key !== 'Enter' && e.key !== ' ') return; const row = e.target.closest('.tp-row'); if (!row) return; e.preventDefault(); show(row); });
  show($('ul:not([hidden]) .tp-row', list), true);

  let held = false, visible = false, autoT = 0, startedAt = 0, left = 6000;
  const STEP = 6000;
  const step = () => {
    autoT = 0;
    if (!held && visible && !document.hidden && pane.offsetParent) {
      const rows = $$('ul:not([hidden]) .tp-row', list);
      const next = rows[(rows.indexOf(cur) + 1) % rows.length];
      if (next) {
        show(next);
        const lt = list.getBoundingClientRect(), rt = next.getBoundingClientRect();
        if (rt.top < lt.top || rt.bottom > lt.bottom) list.scrollTo({ top: list.scrollTop + rt.top - lt.top - 8, behavior: reduce ? 'auto' : 'smooth' });
      }
    }
    arm();
  };
  bar.style.setProperty('--step', STEP + 'ms');
  const arm = () => {
    clearTimeout(autoT); autoT = 0;
    if (reduce) return;
    bar.classList.remove('is-run', 'is-paused'); void bar.offsetWidth;
    if (!visible) return;
    if (!held) bar.classList.add('is-run');
    left = STEP; startedAt = performance.now();
    autoT = setTimeout(step, STEP);
  };
  const pauseView = () => {
    if (!autoT) return;
    left = Math.max(0, left - (performance.now() - startedAt));
    clearTimeout(autoT); autoT = 0;
    bar.classList.add('is-paused');
  };
  const resumeView = () => {
    if (reduce || held || autoT) return;
    if (!bar.classList.contains('is-run')) { arm(); return; }
    bar.classList.remove('is-paused');
    startedAt = performance.now();
    autoT = setTimeout(step, left);
  };
  const hold = () => { held = true; clearTimeout(autoT); autoT = 0; bar.classList.remove('is-run', 'is-paused'); };
  rec.addEventListener('pointerenter', hold);
  rec.addEventListener('pointerleave', () => { held = false; arm(); });
  rec.addEventListener('focusin', hold);
  rec.addEventListener('focusout', () => { held = false; arm(); });
  list.addEventListener('click', arm);
  list.addEventListener('keydown', arm);
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { const was = visible; visible = es[0].isIntersecting; if (visible && !was) resumeView(); else if (!visible) pauseView(); }, { threshold: .35 }).observe(rec); else { visible = true; arm(); }

  const yearHead = $('[data-year-head]', rec);
  initTabs($('.tp-yrs', rec), { onSelect: id => {
    const group = $(`ul[data-y="${id}"]`, list);
    if (group) yearHead.textContent = `${group.children.length} Ranks, UPSC CSE ${id}`;
    const swap = () => {
      $$('ul[data-y]', list).forEach(u => { u.hidden = u.dataset.y !== id; });
      list.scrollTop = 0;
      cur = null;
      show($('ul:not([hidden]) .tp-row', list));
    };
    if (document.startViewTransition && !reduce) document.startViewTransition(swap); else swap();
  } });
}

export function initDiamondReel() {
  const dr = document.querySelector('#toppers .dr'); if (!dr) return;
  const track = dr.querySelector('.dr__track'), view = dr.querySelector('.dr__view'), head = document.getElementById('drHead');
  const tabs = [...dr.querySelectorAll('.dr__bar .tab')];
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PIC = 'assets/img/toppers/portrait/placeholder-man.webp';   // WebP (was a 143KB PNG; user 2026-11-16, performance)
  const data = window.NP_ARCHIVE;

  const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const tidyProg = p => p.replace(/^&\s*/, '').trim()
    .replace(/^IGP$/i, 'Interview Guidance Programme').replace(/\bIGP\b/g, 'Interview Guidance Programme')
    .replace(/Interview Guidance Program\b/gi, 'Interview Guidance Programme').replace(/Prelims Cum Mains/g, 'Prelims-cum-Mains');
  const progs = s => (s || '').split(/,(?![^(]*\))|\s&\s/).map(tidyProg).filter(Boolean);
  const titleWord = w => /^[A-Z]{3,}$/.test(w) ? w[0] + w.slice(1).toLowerCase() : w;
  const tidyName = n => n.replace(/\s*-\s*Rank\s*\d+$/i, '').replace(/^[^A-Za-z]+|[^A-Za-z.]+$/g, '').replace(/\.$/, '').split(' ').map(titleWord).join(' ');
  const extra = {};
  (window.TOPPERS || []).forEach(t => { if (t.c && t.r) extra[t.y + '-' + t.r] = t.c; });

  const card = (y, t) => {
    const P = progs(t.programmes || extra[y + '-' + t.rank]);
    const lab = P.slice(0, 2).map(esc).join('&nbsp;&middot; ') + (P.length > 2 ? ` +${P.length - 2} more` : '');
    return `<li class="dr__item">
      <div class="dr__fig"><span class="dr__gem" aria-hidden="true"><i></i></span><span class="dr__pic"><img src="${PIC}" alt="" width="360" height="360" decoding="async"></span></div>
      <p class="dr__n" aria-hidden="true"><small>AIR</small> ${t.rank}</p>
      <h4 class="dr__name">${esc(tidyName(t.name))}<span class="pd__vh">, All India Rank ${t.rank}</span></h4>
      ${lab ? `<p class="dr__prog">${lab}</p>` : ''}
    </li>`;
  };
  const render = y => {
    const list = ((data && data.ARCHIVE[y]) || []).slice().sort((a, b) => a.rank - b.rank);
    track.innerHTML = list.map(t => card(y, t)).join('');
    head.textContent = y === 2025 ? '36 rank holders, CSE 2025' : `Rank holders, CSE ${y}`;
    dr.setAttribute('aria-label', y === 2025 ? 'More UPSC CSE 2025 rank holders' : `UPSC CSE ${y} rank holders`);
  };

  const SPEED = 34;
  let looping = false, loopW = 0, anim = null, vel = 0, hover = false, drag = null, fling = 0, moved = false, wheelT = 0;
  const dur = () => loopW / SPEED * 1000;
  const getOff = () => anim ? -((anim.currentTime || 0) % dur()) / dur() * loopW : 0;
  const setOff = o => { if (!anim) return; let m = o % loopW; if (m > 0) m -= loopW; anim.currentTime = -m / loopW * dur() + dur() * 100; };
  const live = () => looping && !dr.classList.contains('is-off');
  const sync2 = () => { if (!anim) return; if (live() && !hover && !drag && !fling && !wheelT) anim.play(); else anim.pause(); };
  const flingStep = now => {
    fling = 0;
    if (!anim || drag) return;
    const dt = flingStep.last ? Math.min(.05, (now - flingStep.last) / 1000) : 0; flingStep.last = now;
    if (Math.abs(vel) > 8 && live()) { setOff(getOff() + vel * dt); vel *= Math.exp(-dt * 3.2); fling = requestAnimationFrame(flingStep); }
    else { vel = 0; sync2(); }
  };
  const layout = () => {
    track.querySelectorAll('[data-copy]').forEach(c => c.remove());
    track.classList.remove('is-loop', 'is-still', 'is-drag');
    if (anim) { anim.cancel(); anim = null; }
    cancelAnimationFrame(fling); fling = 0;
    looping = false; vel = 0; track.style.transform = '';
    if (still) return;
    const fits = track.scrollWidth <= view.clientWidth;
    if (fits) { track.classList.add('is-still'); return; }
    [...track.children].forEach(li => { const c = li.cloneNode(true); c.dataset.copy = ''; c.setAttribute('aria-hidden', 'true'); c.inert = true; track.appendChild(c); });
    loopW = track.scrollWidth / 2; looping = true;
    track.classList.add('is-drag');
    anim = track.animate([{ transform: 'translate3d(0, 0, 0)' }, { transform: `translate3d(${-loopW}px, 0, 0)` }], { duration: dur(), iterations: Infinity });
    applyRate();
    sync2();
  };
  let boost = 0, dir = 1, rate = 1, boostRaf = 0, sy = scrollY, st = performance.now();
  const BOOST_MAX = 6, BOOST_PER_PX_S = 1 / 250;
  const applyRate = () => {
    if (!anim) return;
    if (rate < 0 && (anim.currentTime || 0) < dur()) anim.currentTime = (anim.currentTime || 0) + dur() * 100;
    anim.playbackRate = rate;
  };
  const boostStep = now => {
    boostRaf = 0;
    const dt = Math.min(.05, (now - (boostStep.last || now)) / 1000); boostStep.last = now;
    boost *= Math.exp(-dt * 2.4);
    if (boost < .02) boost = 0;
    const target = dir * (1 + boost);
    rate += (target - rate) * (1 - Math.exp(-dt * 9));
    if (Math.abs(target - rate) < .01) rate = target;
    applyRate();
    if (boost || rate !== dir) boostRaf = requestAnimationFrame(boostStep); else boostStep.last = 0;
  };
  if (!still) addEventListener('scroll', () => {
    const now = performance.now(), d = scrollY - sy, dt = Math.max(1, now - st); sy = scrollY; st = now;
    if (!d || !looping || dr.classList.contains('is-off')) return;
    dir = d > 0 ? 1 : -1;
    boost = Math.max(boost, Math.min(BOOST_MAX, Math.abs(d) / dt * 1000 * BOOST_PER_PX_S));
    if (!boostRaf) boostRaf = requestAnimationFrame(boostStep);
  }, { passive: true });
  let hoverT = 0;   // the drift holds only once the mouse has rested on the row for 3 seconds (user 2026-11-21), until it leaves
  view.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { clearTimeout(hoverT); hoverT = setTimeout(() => { hover = true; sync2(); }, 3000); } });
  view.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { clearTimeout(hoverT); hover = false; sync2(); } });
  view.addEventListener('pointerdown', e => {
    if (!looping || (e.pointerType === 'mouse' && e.button !== 0)) return;
    cancelAnimationFrame(fling); fling = 0; vel = 0; moved = false;
    drag = { id: e.pointerId, x: e.clientX, off: getOff(), lx: e.clientX, lt: performance.now(), vx: 0 };
  });
  view.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    if (!moved && Math.abs(dx) < 4) return;
    if (!moved) { moved = true; view.setPointerCapture(e.pointerId); view.classList.add('is-grabbing'); drag.off = getOff(); drag.x = e.clientX; sync2(); }
    const now = performance.now(), v = (e.clientX - drag.lx) / Math.max(.001, (now - drag.lt) / 1000);
    drag.vx = drag.vx * .3 + v * .7; drag.lx = e.clientX; drag.lt = now;
    setOff(drag.off + (e.clientX - drag.x));
  });
  const release = e => {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    const flick = moved && performance.now() - drag.lt < 90 ? Math.max(-1800, Math.min(1800, drag.vx)) : 0;
    drag = null; view.classList.remove('is-grabbing');
    if (flick) { vel = flick; flingStep.last = 0; fling = requestAnimationFrame(flingStep); } else sync2();
  };
  view.addEventListener('pointerup', release);
  view.addEventListener('pointercancel', release);
  view.addEventListener('lostpointercapture', release);
  view.addEventListener('wheel', e => {
    if (!looping) return;
    const k = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? view.clientWidth : 1;
    const dx = e.deltaX * k, dy = e.deltaY * k;
    if (!dx || Math.abs(dx) <= Math.abs(dy)) return;
    e.preventDefault();
    cancelAnimationFrame(fling); fling = 0; vel = 0;
    clearTimeout(wheelT); wheelT = setTimeout(() => { wheelT = 0; sync2(); }, 180);
    sync2();
    setOff(getOff() - dx);
  }, { passive: false });
  view.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  view.addEventListener('dragstart', e => e.preventDefault());

  let year = 2025, swapT = 0;
  const bar = dr.querySelector('.dr__bar');
  const tabApi = initTabs(bar, { onSelect: (id, tab) => {
    const y = +id; if (y === year) return;
    year = y;
    view.setAttribute('aria-labelledby', tab.id);
    view.classList.add('is-sw'); clearTimeout(swapT);
    swapT = setTimeout(() => { render(y); layout(); view.classList.remove('is-sw'); }, still ? 0 : 280);
  } });
  if (data) {
    const all = dr.querySelector(".dr__all"), older = tabs.filter(t => t.classList.contains("dr__tab--old"));
    if (all && older.length) all.addEventListener("click", () => {
      const open = all.getAttribute("aria-expanded") !== "true";
      older.forEach(t => { t.hidden = !open; });
      all.setAttribute("aria-expanded", open);
      all.querySelector(".dr__all-t").textContent = open ? "Show fewer" : "View all";
      if (!open && older.some(t => t.getAttribute("aria-selected") === "true")) tabApi.select(tabs[0].dataset.tab);
      requestAnimationFrame(() => { tabApi.place(true); tabApi.centre(true); });
    });
    else if (all) all.hidden = true;
  } else bar.hidden = true;   // no data, no years to choose from

  layout(); tabApi.centre(false);
  let rt = 0; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { layout(); tabApi.centre(false); }, 150); });
  const sync = () => { dr.classList.toggle('is-off', document.hidden); sync2(); };
  document.addEventListener('visibilitychange', sync);
  sync();
}

export function initStars() {
  var box = document.querySelector('[data-stars]');
  if (!box) return;
  var host = box.parentElement;
  var hex = (box.getAttribute('data-stars') || '#ffffff').replace('#', '');
  var rgb = [0, 2, 4].map(function (i) { return parseInt(hex.substr(i, 2), 16); }).join(',');
  var still = true;   // static glitter (user 2026-11-17): one frame drawn once, like an image; nothing moves or twinkles

  var cv = document.createElement('canvas');
  box.innerHTML = '';
  box.appendChild(cv);
  var cx = cv.getContext('2d');
  var W = 0, H = 0, dpr = 1, flies = [], raf = 0, onScreen = true, last = performance.now();

  function make(n) {
    flies = [];
    for (var i = 0; i < n; i++) {
      flies.push({ x: Math.random() * W, y: Math.random() * H, a: Math.random() * Math.PI * 2,
        v: .12 + Math.random() * .22,                      // px a frame: slow
        r: 3 + Math.random() * 5,                          // the star's reach, centre to point
        period: 3.5 + Math.random() * 4.5,                 // seconds between lightings
        phase: Math.random(),                              // where in its beat it starts
        spin: (Math.random() - .5) * .004, rot: (Math.random() - .5) * .3 });
    }
  }
  function size() {
    var w = box.clientWidth, h = box.clientHeight;
    if (!w || !h) return;
    var regrow = !flies.length || Math.abs(w - W) > 40 || Math.abs(h - H) > 40;
    W = w; H = h; dpr = Math.min(1.5, window.devicePixelRatio || 1);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (regrow) make(Math.max(24, Math.min(90, Math.round(W * H / 22000))));
    sprites();
    draw(0);
  }

  function glow(p) {
    if (p < .55) return 0;
    if (p < .68) { var u = (p - .55) / .13; return u * u * (3 - 2 * u); }
    if (p < .76) return 1;
    var d = (p - .76) / .24; return 1 - d * d * (3 - 2 * d);
  }
  function sparkle(x, y, r, rot) {
    var k = r * .16;
    cx.save(); cx.translate(x, y); cx.rotate(rot);
    cx.beginPath();
    cx.moveTo(0, -r);
    cx.quadraticCurveTo(k, -k, r, 0);
    cx.quadraticCurveTo(k, k, 0, r);
    cx.quadraticCurveTo(-k, k, -r, 0);
    cx.quadraticCurveTo(-k, -k, 0, -r);
    cx.closePath(); cx.fill();
    cx.restore();
  }

  var R = 12, PAD = 30, spr = null;
  function sprite(blur, colour, alpha) {
    var c = document.createElement('canvas'), n = Math.ceil((R + PAD) * 2 * dpr);
    c.width = c.height = n;
    var g = c.getContext('2d'), keep = cx;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = g;   // sparkle() draws on cx
    g.shadowBlur = blur * dpr; g.shadowColor = 'rgba(' + colour + ',' + alpha + ')'; g.fillStyle = 'rgba(' + colour + ',1)';
    sparkle(R + PAD, R + PAD, R, 0);
    cx = keep;
    return c;
  }
  function sprites() { spr = { ember: sprite(4, rgb, 0), glow: sprite(26, rgb, .95), core: sprite(0, '255,255,255', 0) }; }
  function stamp(img, x, y, r, rot, alpha) {
    if (alpha < .01) return;
    var k = r / R, s = (R + PAD) * 2 * k;
    cx.globalAlpha = alpha;
    cx.save(); cx.translate(x, y); cx.rotate(rot);
    cx.drawImage(img, -s / 2, -s / 2, s, s);
    cx.restore();
  }

  function draw(dt) {
    var t = performance.now() / 1000;
    cx.clearRect(0, 0, W, H);
    if (!spr) sprites();
    for (var i = 0; i < flies.length; i++) {
      var f = flies[i];
      if (dt) {   // wander: the heading turns a little, as a firefly's
        f.a += (Math.random() - .5) * .08 * dt;
        f.x += Math.cos(f.a) * f.v * dt; f.y += Math.sin(f.a) * f.v * dt - .03 * dt;   // and a faint rise
        f.rot += f.spin * dt;
        if (f.x < -20) f.x = W + 20; else if (f.x > W + 20) f.x = -20;
        if (f.y < -20) f.y = H + 20; else if (f.y > H + 20) f.y = -20;
      }
      var g = still ? .7 : glow(((t / f.period) + f.phase) % 1);
      var o = .14 + g * .86;                               // never quite gone: a faint ember between lightings
      var r = f.r * (.85 + g * .35);
      stamp(spr.ember, f.x, f.y, r, f.rot, o * (1 - g));
      stamp(spr.glow, f.x, f.y, r, f.rot, o * g);
      if (g > .05) stamp(spr.core, f.x, f.y, r * .45, f.rot, g * .85);   // a bright core while lit
    }
    cx.globalAlpha = 1;
  }
  function loop(now) {
    raf = 0;
    if (!onScreen || document.hidden) return;
    if (now - last >= 32) {   // about 30 redraws a second
      var dt = Math.min(3, (now - last) / 16.67); last = now;   // in 60fps frames, so the pace holds on any screen
      draw(dt);
    }
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!still && !raf && onScreen && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(loop); } }

  size();
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(box);
  else window.addEventListener('resize', size);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) {
    onScreen = e[0].isIntersecting;
    var sec = host.closest('#toppers'); if (sec) sec.classList.toggle('pd--off', !onScreen);
    start();
  }).observe(host);
  document.addEventListener('visibilitychange', start);
  start();
}
