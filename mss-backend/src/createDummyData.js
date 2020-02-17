import Post from "./models/post";

export default function createDummyData() {
    // 0, 1, ... 39로 이루어진 배열을 생성한 후 포스트 데이터로 반환
    const posts = [...Array(40).keys()].map(i => ({
        title: `포스트 ${i}`,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Cras dapibus, purus at vulputate egestas, orci sem sodales sem, ' +
            'a mattis arcu libero sed metus. Nunc vitae nisi eu leo euismod aliquam.' +
            ' Donec tincidunt, dui at viverra volutpat, massa turpis efficitur diam,' +
            ' a ultricies turpis quam vitae ipsum. Quisque nec ipsum sodales,' +
            ' fringilla ante ac, fringilla ex. Phasellus sagittis varius est,' +
            ' et tempus neque tincidunt vel. Nam ut lectus placerat,' +
            ' placerat erat et, convallis metus. Aliquam et luctus dui,' +
            ' vitae consequat odio. Aliquam molestie velit vitae mi porttitor,' +
            ' sit amet pulvinar felis pharetra. Donec rhoncus diam sem,' +
            ' in dapibus lectus porttitor ac.' +
            ' Quisque pellentesque ipsum et libero molestie lobortis.' +
            ' Mauris condimentum justo et dapibus sodales. Aliquam posuere laoreet ex,' +
            ' vel dapibus ex. Duis condimentum velit et diam fringilla,' +
            ' a posuere tellus consequat. In at metus pretium,' +
            ' posuere lacus vel, consequat nunc.',
        tags: ['더미 태그1', '더미 태그2'],
    }));

    Post.insertMany(posts, (err, docs) => {
        console.log(docs);
    });
}