import React, { useState } from 'react';
import Toolbar from '../components/Toolbar';

export default function ProjectPage() {
    const [likes, setLikes] = useState(0);
    const [loved, setLoved] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const recommendedProjects = [
        {
            id: 1,
            title: 'Nuclear Adventure',
            creator: 'NuclearMod Creator',
            likes: 24
        },
        {
            id: 2,
            title: 'Block Builder',
            creator: 'NuclearMod Creator',
            likes: 18
        },
        {
            id: 3,
            title: 'Sprite Lab',
            creator: 'NuclearMod Creator',
            likes: 11
        }
    ];

    const submitComment = () => {
        const text = comment.trim();

        if (!text) return;

        setComments((current) => [
            ...current,
            {
                id: Date.now(),
                text
            }
        ]);

        setComment('');
    };

    return (
        <div className="project-page">
            <Toolbar />

            <main className="project-content">
                <section className="project-header">
                    <div className="project-preview">
                        <div className="project-stage">
                            <span>Project Preview</span>
                        </div>
                    </div>

                    <div className="project-info">
                        <h1>NuclearMod Project</h1>

                        <p>
                            Created with NuclearMod
                        </p>

                        <div className="project-actions">
                            <button
                                onClick={() =>
                                    setLikes((value) => value + 1)
                                }
                            >
                                ❤️ Like {likes}
                            </button>

                            <button
                                className={
                                    loved
                                        ? 'love active'
                                        : 'love'
                                }
                                onClick={() =>
                                    setLoved((value) => !value)
                                }
                            >
                                {loved ? '✓ Loved' : '✓ Love'}
                            </button>
                        </div>
                    </div>
                </section>

                <section className="comments">
                    <h2>Comments</h2>

                    <div className="comment-box">
                        <textarea
                            value={comment}
                            onChange={(event) =>
                                setComment(event.target.value)
                            }
                            placeholder="Add a comment..."
                            rows="3"
                        />

                        <button onClick={submitComment}>
                            Post Comment
                        </button>
                    </div>

                    <div className="comment-list">
                        {comments.length === 0 ? (
                            <p>
                                No comments yet.
                            </p>
                        ) : (
                            comments.map((item) => (
                                <article
                                    className="comment"
                                    key={item.id}
                                >
                                    <strong>
                                        NuclearMod User
                                    </strong>

                                    <p>{item.text}</p>
                                </article>
                            ))
                        )}
                    </div>
                </section>

                <section className="recommended">
                    <h2>Recommended Projects</h2>

                    <div className="project-grid">
                        {recommendedProjects.map(
                            (project) => (
                                <article
                                    className="project-card"
                                    key={project.id}
                                >
                                    <div className="thumbnail">
                                        🎮
                                    </div>

                                    <h3>
                                        {project.title}
                                    </h3>

                                    <p>
                                        by {project.creator}
                                    </p>

                                    <span>
                                        ❤️ {project.likes}
                                    </span>
                                </article>
                            )
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
      }
