import React, { Component }  from 'react'
import axios from 'axios';
import { Spinner } from '@chakra-ui/spinner';
import { Box } from '@chakra-ui/layout';

class Recipe extends Component {
    state = {
        data: null,
        loading: true,
        error: false
    }

    async getAllRecipes() {
        this.setState({loading: true})
        try {
            const data = await axios.get('http://localhost:8080/recipes')
            console.log(data.data)
            this.setState({data: data.data})
        } catch (error) {
            this.setState({error: true})
        } finally {
            this.setState({loading: false})
        }
    }

    componentDidMount() {
        this.getAllRecipes()
    }

    render () {
        const {data, loading, error} = this.state

        if (loading) {
            return (
            <Box className="body" display="flex" justifyContent="center" alignItems="center">
                <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                />
            </Box>
            )
        } else {

        }

        if (error) {
            return <Box class="error">
                Something went wrong...
            </Box>
        }

        return (
        <div className="body">
            {data.map(recipe => {
                {console.log("hello")}
                <Box key={recipe.id}>
                    {recipe.name}
                </Box>
            })}
            <div className="book">
                <input type="checkbox" id="c1"/>
                <input type="checkbox" id="c2"/>
                <input type="checkbox" id="c3"/>
                <div id="cover">My cover page.</div>
                <div className="flip-book">
                    <div className="flip" id ="p1">
                        <div className="back">
                            my second page.
                            <label className="back-btn" htmlFor="c1">Back</label>
                        </div>
                        <div className="front">
                            <h2>Apple</h2>
                            <p>some paragraph about apple.</p>
                            <label className="next-btn" htmlFor="c1">Next</label>
                        </div>
                    </div>
                    <div className="flip" id ="p2">
                        <div className="back">
                            my second page.
                            <label className="back-btn" htmlFor="c2">Back</label>
                        </div>
                        <div className="front">
                            <h2>Pineapple</h2>
                            <p>some paragraph about apple.</p>
                            <label className="next-btn" htmlFor="c2">Next</label>
                        </div>
                    </div>
                    <div className="flip" id ="p3">
                        <div className="back">
                            my second page.
                            <label className="back-btn" htmlFor="c3">Back</label>
                        </div>
                        <div className="front">
                            <h2>Strawberry</h2>
                            <p>some paragraph about apple.</p>
                            <label className="next-btn" htmlFor="c3">Next</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Recipe;
