import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from "react"

const API_BASE_URL = 'http://192.168.137.201:3000'

const QueryCard = ({ item, onReplyPress, onVotePress }: any) => {
    const [replyMessage, setReplyMessage] = useState('')

    const ReplyView = ({ reply }: any) => {
        return (
            <View style={styles.replyCard}>
                <Text style={styles.replyText}>{reply?.message}</Text>
                <View style={styles.replyActions}>
                    <Text style={styles.replyRating}>Rating: {reply?.rating}</Text>
                    <TouchableOpacity
                        style={styles.upvoteButton}
                        onPress={() => onVotePress(reply, 'upvote')}
                    >
                        <Text style={styles.upvoteText}>Upvote</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.downvoteButton}
                        onPress={() => onVotePress(reply, 'downvote')}
                    >
                        <Text style={styles.downvoteText}>Downvote</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderReply = (reply: any) => (
        <ReplyView key={reply?.replyId} queryId={item?.queryid} reply={reply} />
    )

    const handleReply = async () => {
        await onReplyPress(replyMessage, item?.queryid)
        setReplyMessage('')
    }

    // Sort replies by rating (highest rating first)
    const sortedReplies = item?.queryreplies?.sort((a: any, b: any) => b?.rating - a?.rating)

    return (
        <View style={styles.queryCard}>
            <Text style={styles.queryTitle}>{item?.title}</Text>
            <Text style={styles.queryBody}>{item?.details}</Text>

            <Text style={styles.repliesHeading}>Replies:</Text>

            {sortedReplies?.map((replyItem: any) => (
                renderReply(replyItem)
            ))}

            <View style={styles.replyInputContainer}>
                <TextInput
                    style={styles.replyInput}
                    placeholder="Type your reply..."
                    value={replyMessage}
                    onChangeText={setReplyMessage}
                />
                <TouchableOpacity
                    style={styles.replyButton}
                    onPress={handleReply}
                >
                    <Text style={styles.replyButtonText}>Reply</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const QueryDiscussionScreen = () => {
    const [queries, setQueries] = useState([])
    const [queryTitle, setQueryTitle] = useState("")
    const [queryBody, setQueryBody] = useState("")
    const [loading, setLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    useEffect(() => {
        fetchQueries()
    }, [])

    const fetchQueries = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_BASE_URL}/queries`)
            const data = await response.json()
            if (response?.ok) {
                setQueries(data?.queries)
            } else {
                console.error('Error fetching queries:', data?.message)
            }
        } catch (error: any) {
            console.error('Error fetching queries:', error?.message)
        } finally {
            setLoading(false)
        }
    }

    const onAddQuery = async () => {
        if (!queryTitle || !queryBody) {
            Alert.alert("Error", "Please fill in both the title and details.")
            return
        }

        const newQuery = {
            title: queryTitle,
            details: queryBody,
        }

        try {
            setButtonLoading(true)
            const response = await fetch(`${API_BASE_URL}/addQuery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuery),
            })

            const data = await response.json()

            if (response.ok) {
                Alert.alert("Success", "Query added successfully.")
                setQueryTitle('')
                setQueryBody('')
            } else {
                Alert.alert("Error", data.message || "Failed to add query.")
            }

            setButtonLoading(false)
            fetchQueries()
        } catch (error) {
            console.error("Error adding query:", error)
            setButtonLoading(false)
            Alert.alert("Error", "An error occurred while adding the query.")
        }
    }

    const handleReply = async (message: string, queryId: string) => {
        if (!message) {
            Alert.alert("Error", "Please provide a reply message.")
            return
        }

        const newReply = {
            queryId: queryId,
            message: message,
            rating: 0,
        }

        try {
            const response = await fetch(`${API_BASE_URL}/addQueryReply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReply),
            })

            const data = await response.json()

            if (response.ok) {
                Alert.alert("Success", "Reply added successfully.")
                fetchQueries()
            } else {
                Alert.alert("Error", data.message || "Failed to add reply.")
            }
        } catch (error) {
            console.error("Error adding reply:", error)
            Alert.alert("Error", "An error occurred while adding the reply.")
        }
    }

    const handleVote = async (reply: any, voteAction: 'upvote' | 'downvote') => {
        if (reply?.replyId == undefined || reply?.rating == undefined || !voteAction) {
            Alert.alert("Error", "Please provide a valid replyId and voteAction (upvote or downvote).")
            return
        }

        try {
            const response = await fetch(`${API_BASE_URL}/voteReply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    replyId: reply?.replyId,
                    voteAction,
                }),
            })

            const result = await response.json()

            if (response.ok) {
                Alert.alert("Success", `Your vote was successfully recorded. New rating: ${result.updatedReply.rating}`)
                fetchQueries()
            } else {
                Alert.alert("Error", result.message || "Something went wrong.")
            }
        } catch (error) {
            console.error("Error voting:", error)
            Alert.alert("Error", "An error occurred while processing your vote.")
        }
    }

    const renderQuery = ({ item }: any) => (
        <QueryCard
            item={item}
            key={item?.queryId}
            onVotePress={handleVote}
            onReplyPress={handleReply}
        />
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{'Query & Discussion Forum'}</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Query Title"
                    value={queryTitle}
                    onChangeText={setQueryTitle}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Query Details"
                    value={queryBody}
                    onChangeText={setQueryBody}
                    multiline
                />
                <TouchableOpacity style={styles.postButton} onPress={onAddQuery}>
                    {buttonLoading ?
                        <ActivityIndicator color={'white'} />
                        :
                        <Text style={styles.postButtonText}>Post Query</Text>
                    }
                </TouchableOpacity>
            </View>

            {loading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={'#FF7E5F'} />
                </View>
                :
                <FlatList
                    data={queries}
                    bounces={false}
                    overScrollMode="never"
                    renderItem={renderQuery}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.queryList}
                    keyExtractor={(item: any) => item?.queryId?.toString()}
                />
            }
        </SafeAreaView>
    )
}

export default QueryDiscussionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5E1",
    },
    header: {
        backgroundColor: "#FF7E5F",
        paddingTop: 45,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: "center",
    },
    headerText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    inputContainer: {
        padding: 20,
    },
    input: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#FF7E5F",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        color: "#333",
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    postButton: {
        backgroundColor: "#28A745",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
    },
    postButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    queryList: {
        padding: 20,
    },
    queryCard: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#FF7E5F",
    },
    queryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FF7E5F",
        marginBottom: 5,
    },
    queryBody: {
        fontSize: 14,
        color: "#333",
        marginBottom: 10,
    },
    repliesHeading: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    replyCard: {
        backgroundColor: "#FFF8F0",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#FF7E5F",
    },
    replyText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    },
    replyActions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    replyRating: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FF7E5F",
    },
    upvoteButton: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        backgroundColor: "#28A745",
        borderRadius: 4,
    },
    upvoteText: {
        color: "#FFF",
        fontSize: 12,
    },
    downvoteButton: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        backgroundColor: "#DC3545",
        borderRadius: 4,
    },
    downvoteText: {
        color: "#FFF",
        fontSize: 12,
    },
    replyInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    replyInput: {
        flex: 1,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#FF7E5F",
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
        color: "#333",
    },
    replyButton: {
        backgroundColor: "#28A745",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    replyButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "bold",
    },
})
