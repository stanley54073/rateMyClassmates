PGDMP  #    6                |        
   classmates    16.2 (Postgres.app)    16.2 (Postgres.app) '    G           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            H           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            I           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            J           1262    16443 
   classmates    DATABASE     v   CREATE DATABASE classmates WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE classmates;
                postgres    false            �            1259    16488 
   classmates    TABLE     �   CREATE TABLE public.classmates (
    id integer NOT NULL,
    fullname text NOT NULL,
    email text NOT NULL,
    major text NOT NULL,
    instagram text,
    discord text,
    linkedin text
);
    DROP TABLE public.classmates;
       public         heap    stanley    false            �            1259    16487    classmates_id_seq    SEQUENCE     �   CREATE SEQUENCE public.classmates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.classmates_id_seq;
       public          stanley    false    216            K           0    0    classmates_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.classmates_id_seq OWNED BY public.classmates.id;
          public          stanley    false    215            �            1259    16497    courses    TABLE     e   CREATE TABLE public.courses (
    id integer NOT NULL,
    coursename text,
    studentid integer
);
    DROP TABLE public.courses;
       public         heap    stanley    false            �            1259    16496    courses_id_seq    SEQUENCE     �   CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.courses_id_seq;
       public          stanley    false    218            L           0    0    courses_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;
          public          stanley    false    217            �            1259    16506    friend_request    TABLE     x   CREATE TABLE public.friend_request (
    id integer NOT NULL,
    from_id integer,
    to_id integer,
    as_of text
);
 "   DROP TABLE public.friend_request;
       public         heap    stanley    false            �            1259    16505    friend_request_id_seq    SEQUENCE     �   CREATE SEQUENCE public.friend_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.friend_request_id_seq;
       public          stanley    false    220            M           0    0    friend_request_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.friend_request_id_seq OWNED BY public.friend_request.id;
          public          stanley    false    219            �            1259    16515    friends    TABLE     i   CREATE TABLE public.friends (
    id integer NOT NULL,
    person1_id integer,
    person2_id integer
);
    DROP TABLE public.friends;
       public         heap    stanley    false            �            1259    16514    friends_id_seq    SEQUENCE     �   CREATE SEQUENCE public.friends_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.friends_id_seq;
       public          stanley    false    222            N           0    0    friends_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.friends_id_seq OWNED BY public.friends.id;
          public          stanley    false    221            �            1259    16522    ratings    TABLE     �   CREATE TABLE public.ratings (
    id integer NOT NULL,
    comment text,
    rating real,
    date_of_rating text,
    rated_from_id integer,
    rated_to_id integer,
    course_rated text
);
    DROP TABLE public.ratings;
       public         heap    stanley    false            �            1259    16521    ratings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.ratings_id_seq;
       public          stanley    false    224            O           0    0    ratings_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;
          public          stanley    false    223            �           2604    16491    classmates id    DEFAULT     n   ALTER TABLE ONLY public.classmates ALTER COLUMN id SET DEFAULT nextval('public.classmates_id_seq'::regclass);
 <   ALTER TABLE public.classmates ALTER COLUMN id DROP DEFAULT;
       public          stanley    false    215    216    216            �           2604    16500 
   courses id    DEFAULT     h   ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);
 9   ALTER TABLE public.courses ALTER COLUMN id DROP DEFAULT;
       public          stanley    false    218    217    218            �           2604    16509    friend_request id    DEFAULT     v   ALTER TABLE ONLY public.friend_request ALTER COLUMN id SET DEFAULT nextval('public.friend_request_id_seq'::regclass);
 @   ALTER TABLE public.friend_request ALTER COLUMN id DROP DEFAULT;
       public          stanley    false    219    220    220            �           2604    16518 
   friends id    DEFAULT     h   ALTER TABLE ONLY public.friends ALTER COLUMN id SET DEFAULT nextval('public.friends_id_seq'::regclass);
 9   ALTER TABLE public.friends ALTER COLUMN id DROP DEFAULT;
       public          stanley    false    221    222    222            �           2604    16525 
   ratings id    DEFAULT     h   ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);
 9   ALTER TABLE public.ratings ALTER COLUMN id DROP DEFAULT;
       public          stanley    false    224    223    224            <          0    16488 
   classmates 
   TABLE DATA           ^   COPY public.classmates (id, fullname, email, major, instagram, discord, linkedin) FROM stdin;
    public          stanley    false    216   �(       >          0    16497    courses 
   TABLE DATA           <   COPY public.courses (id, coursename, studentid) FROM stdin;
    public          stanley    false    218   /)       @          0    16506    friend_request 
   TABLE DATA           C   COPY public.friend_request (id, from_id, to_id, as_of) FROM stdin;
    public          stanley    false    220   x)       B          0    16515    friends 
   TABLE DATA           =   COPY public.friends (id, person1_id, person2_id) FROM stdin;
    public          stanley    false    222   �)       D          0    16522    ratings 
   TABLE DATA           p   COPY public.ratings (id, comment, rating, date_of_rating, rated_from_id, rated_to_id, course_rated) FROM stdin;
    public          stanley    false    224   �)       P           0    0    classmates_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.classmates_id_seq', 7, true);
          public          stanley    false    215            Q           0    0    courses_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.courses_id_seq', 13, true);
          public          stanley    false    217            R           0    0    friend_request_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.friend_request_id_seq', 4, true);
          public          stanley    false    219            S           0    0    friends_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.friends_id_seq', 3, true);
          public          stanley    false    221            T           0    0    ratings_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.ratings_id_seq', 9, true);
          public          stanley    false    223            �           2606    16495    classmates classmates_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.classmates
    ADD CONSTRAINT classmates_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.classmates DROP CONSTRAINT classmates_pkey;
       public            stanley    false    216            �           2606    16504    courses courses_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_pkey;
       public            stanley    false    218            �           2606    16513 "   friend_request friend_request_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.friend_request
    ADD CONSTRAINT friend_request_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.friend_request DROP CONSTRAINT friend_request_pkey;
       public            stanley    false    220            �           2606    16520    friends friends_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.friends DROP CONSTRAINT friends_pkey;
       public            stanley    false    222            �           2606    16529    ratings ratings_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.ratings DROP CONSTRAINT ratings_pkey;
       public            stanley    false    224            <   y   x�3�.I��I�Tp���K�,��ASsc��������\μ�����Ģ�NNN.SN�Ҽ����l����,(/���d��t����ť٩
������`^)�C��=... 33?      >   9   x�3�tvV0�4�4�2B�q#x�\&���1H�!e�e���qY 8�\1z\\\ ���      @      x������ � �      B      x�3�4�4�2�4�4�2�f\1z\\\ #�      D   �   x�U�A� E�N����u/`��M��hJ"D��D���7o>��Â�F������Xi���'_jȀeEOyl�ݹ[�=q"^��Dԥ(mj��AQy_eYdu|�a]�:�<C��>�=���:���,HM�X]1ϼ�l���\��/"� �A=�     