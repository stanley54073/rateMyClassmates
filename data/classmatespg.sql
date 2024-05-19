--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Postgres.app)
-- Dumped by pg_dump version 16.2 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: classmates; Type: TABLE; Schema: public; Owner: stanley
--

CREATE TABLE public.classmates (
    id integer NOT NULL,
    fullname text NOT NULL,
    email text NOT NULL,
    major text NOT NULL,
    instagram text,
    discord text,
    linkedin text
);

--
-- Name: classmates_id_seq; Type: SEQUENCE; Schema: public; Owner: stanley
--

CREATE SEQUENCE public.classmates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: classmates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stanley
--

ALTER SEQUENCE public.classmates_id_seq OWNED BY public.classmates.id;


-- Name: courses; Type: TABLE; Schema: public; Owner: stanley
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    coursename text,
    studentid integer
);


ALTER TABLE public.courses OWNER TO stanley;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: stanley
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courses_id_seq OWNER TO stanley;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stanley
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: friend_request; Type: TABLE; Schema: public; Owner: stanley
--

CREATE TABLE public.friend_request (
    id integer NOT NULL,
    from_id integer,
    to_id integer,
    as_of text
);


ALTER TABLE public.friend_request OWNER TO stanley;

--
-- Name: friend_request_id_seq; Type: SEQUENCE; Schema: public; Owner: stanley
--

CREATE SEQUENCE public.friend_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.friend_request_id_seq OWNER TO stanley;

--
-- Name: friend_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stanley
--

ALTER SEQUENCE public.friend_request_id_seq OWNED BY public.friend_request.id;


--
-- Name: friends; Type: TABLE; Schema: public; Owner: stanley
--

CREATE TABLE public.friends (
    id integer NOT NULL,
    person1_id integer,
    person2_id integer
);


ALTER TABLE public.friends OWNER TO stanley;

--
-- Name: friends_id_seq; Type: SEQUENCE; Schema: public; Owner: stanley
--

CREATE SEQUENCE public.friends_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: friends_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stanley
--

ALTER SEQUENCE public.friends_id_seq OWNED BY public.friends.id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: stanley
--

CREATE TABLE public.ratings (
    id integer NOT NULL,
    comment text,
    rating real,
    date_of_rating text,
    rated_from_id integer,
    rated_to_id integer,
    course_rated text
);

--
-- Name: ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: stanley
--

CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stanley
--

ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;


--
-- Name: classmates id; Type: DEFAULT; Schema: public; Owner: stanley
--

ALTER TABLE ONLY public.classmates ALTER COLUMN id SET DEFAULT nextval('public.classmates_id_seq'::regclass);


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: stanley
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: friend_request id; Type: DEFAULT; Schema: public; Owner: stanley
--

ALTER TABLE ONLY public.friend_request ALTER COLUMN id SET DEFAULT nextval('public.friend_request_id_seq'::regclass);


--
-- Name: friends id; Type: DEFAULT; Schema: public; Owner: stanley
--

ALTER TABLE ONLY public.friends ALTER COLUMN id SET DEFAULT nextval('public.friends_id_seq'::regclass);


--
-- Name: ratings id; Type: DEFAULT; Schema: public; Owner: stanley
--

ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);


--
-- Data for Name: classmates; Type: TABLE DATA; Schema: public; Owner: stanley
--

COPY public.classmates (id, fullname, email, major, instagram, discord, linkedin) FROM stdin;
6	Stanley Chong	stanleychong54073@gmail.com	not declared			
5	Jungkook Doop	jungkookdoop@gmail.com	not declared	stan.chong		
7	Sasuke Uchiha	sasukeuchiha54073@gmail.com	not declared			
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: stanley
--

COPY public.courses (id, coursename, studentid) FROM stdin;
1	CPSC 490	2
2	CPSC 490	26
3	CPSC 490	3
4	CPSC 323	26
5	CPSC 490	5
7	CPSC 490	6
8	CPSC 490	7
\.


--
-- Data for Name: friend_request; Type: TABLE DATA; Schema: public; Owner: stanley
--

COPY public.friend_request (id, from_id, to_id, as_of) FROM stdin;
\.


--
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: stanley
--

COPY public.friends (id, person1_id, person2_id) FROM stdin;
1	7	6
2	5	7
3	5	6
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: stanley
--

COPY public.ratings (id, comment, rating, date_of_rating, rated_from_id, rated_to_id, course_rated) FROM stdin;
1	was	4	2024-05-16	2	2	CPSC 131
2	sass	4	2024-05-09	2	2	CPSC 420
3	very good 	3	2024-05-14	2	3	CPSC 131
4	good!	4	2024-05-06	2	5	CPSC 490
5	excellent!	5	2024-05-06	2	6	CPSC 490
6	ehh	1	2024-05-06	2	7	CPSC 490
7	test	2	2024-05-13	2	6	CPSC 131
8	no	1	2024-05-22	2	6	CPSC 131
9	yes	5	2024-05-02	2	7	CPSC 420
\.


--
-- Name: classmates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stanley
--

SELECT pg_catalog.setval('public.classmates_id_seq', 7, true);


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stanley
--

SELECT pg_catalog.setval('public.courses_id_seq', 13, true);


--
-- Name: friend_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stanley
--

SELECT pg_catalog.setval('public.friend_request_id_seq', 4, true);


--
-- Name: friends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stanley
--

SELECT pg_catalog.setval('public.friends_id_seq', 3, true);


--
-- Name: ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stanley
--

SELECT pg_catalog.setval('public.ratings_id_seq', 9, true);


--
-- Name: classmates classmates_pkey; Type: CONSTRAINT; Schema: public; Owner: stanley
--

ALTER TABLE ONLY public.classmates
    ADD CONSTRAINT classmates_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: stanley
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: friend_request friend_request_pkey; Type: CONSTRAINT; Schema: public; Owner: stanley
--

ALTER TABLE ONLY public.friend_request
    ADD CONSTRAINT friend_request_pkey PRIMARY KEY (id);


--
-- Name: friends friends_pkey; Type: CONSTRAINT; Schema: public; Owner: stanley
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: stanley
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

