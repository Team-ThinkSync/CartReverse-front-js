import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Send } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileImage from "../assets/images/user.png";
import PostImage from "../assets/images/clothes.png";

export default function SocialDetail() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  
  const post = {
    id: 1,
    username: "fashion_style",
    userImage: ProfileImage,
    location: "서울 강남구",
    images: [PostImage, PostImage, PostImage],
    currentImageIndex: 0,
    caption: "오늘의 스타일링 💫 트렌디한 스트릿 룩과 편안한 캐주얼의 조화. 어떤 느낌인가요? 이번 시즌 가장 인기있는 아이템 중 하나인 오버사이즈 후드와 와이드 데님을 매치해봤어요. #데일리룩 #스트릿패션 #오오티디",
    likes: 1243,
    posted: "2일 전",
    comments: [
      { id: 1, username: "style_lover", text: "완전 멋있어요! 어디 브랜드 제품인지 알 수 있을까요?", time: "1일 전" },
      { id: 2, username: "fashion_week", text: "색감 조합이 정말 좋네요 👍", time: "1일 전" },
      { id: 3, username: "daily_look", text: "요즘 이런 스타일이 유행이죠! 잘 소화하셨어요 ✨", time: "12시간 전" }
    ]
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // 댓글 추가 로직
      setComment("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            {/* 게시물 헤더 */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                  <img src={post.userImage} alt={post.username} className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <div className="font-medium">{post.username}</div>
                  <div className="text-xs text-gray-500">{post.location}</div>
                </div>
              </div>
              <button className="text-gray-500">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            {/* 게시물 이미지 */}
            <div className="relative">
              <img 
                src={post.images[post.currentImageIndex]} 
                alt="Post" 
                className="w-full max-h-96 md:max-h-full object-cover"
              />
              
              {/* 이미지가 여러 장일 경우 인디케이터 */}
              {post.images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="flex space-x-1">
                    {post.images.map((_, index) => (
                      <div 
                        key={index} 
                        className={`w-2 h-2 rounded-full ${
                          index === post.currentImageIndex ? "bg-blue-500" : "bg-white bg-opacity-60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* 상호작용 버튼 */}
            <div className="p-4">
              <div className="flex justify-between">
                <div className="flex space-x-4">
                  <button onClick={handleLike}>
                    <Heart 
                      size={24} 
                      className={liked ? "fill-red-500 text-red-500" : "text-gray-700"} 
                    />
                  </button>
                  <button>
                    <MessageCircle size={24} className="text-gray-700" />
                  </button>
                  <button>
                    <Share2 size={24} className="text-gray-700" />
                  </button>
                </div>
                <button onClick={handleSave}>
                  <Bookmark 
                    size={24} 
                    className={saved ? "fill-black text-black" : "text-gray-700"} 
                  />
                </button>
              </div>
              
              {/* 좋아요 수 */}
              <div className="mt-2 font-medium">좋아요 {post.likes.toLocaleString()}개</div>
              
              {/* 캡션 */}
              <div className="mt-2">
                <span className="font-medium">{post.username}</span>{" "}
                <span>{post.caption}</span>
              </div>
              
              {/* 댓글 더보기 */}
              {post.comments.length > 2 && (
                <div className="mt-2 text-gray-500 text-sm">
                  댓글 {post.comments.length}개 모두 보기
                </div>
              )}
              
              {/* 댓글 목록 */}
              <div className="mt-2 space-y-2">
                {post.comments.slice(0, 3).map(comment => (
                  <div key={comment.id}>
                    <span className="font-medium">{comment.username}</span>{" "}
                    <span>{comment.text}</span>
                    <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                      <span>{comment.time}</span>
                      <span>좋아요</span>
                      <span>답글 달기</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 게시 시간 */}
              <div className="mt-2 text-xs text-gray-500">{post.posted}</div>
            </div>
            
            {/* 댓글 입력 */}
            <div className="p-4 border-t">
              <form onSubmit={handleComment} className="flex">
                <input
                  type="text"
                  placeholder="댓글 달기..."
                  className="flex-grow bg-transparent outline-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button 
                  type="submit" 
                  className={`text-blue-500 font-medium ${!comment.trim() && "opacity-50"}`}
                  disabled={!comment.trim()}
                >
                  게시
                </button>
              </form>
            </div>
          </div>
          
          {/* 관련 게시물 */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">관련 게시물</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={PostImage} 
                    alt={`관련 게시물 ${item}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}